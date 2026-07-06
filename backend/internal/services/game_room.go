package services

import (
	"encoding/json"
	"fmt"
	"log"

	"Devgame/backend/internal/models"
)

// RoomTimers encapsulates time-driven logic.
type RoomTimers struct{}

// Room represents a single active game room actor.
type Room struct {
	ID        string
	State     *models.GameState
	Inbox     chan models.Command
	Timers    *RoomTimers
	clients   map[string]chan models.WSEvent // map of playerID to their write channel
	Broadcast func(event models.WSEvent)
}

// NewRoom creates a new game room actor.
func NewRoom(id string) *Room {
	r := &Room{
		ID: id,
		State: &models.GameState{
			ID:     id,
			Status: models.GameStatusLobby,
			Seq:    0,
		},
		Inbox:   make(chan models.Command, 100),
		Timers:  &RoomTimers{},
		clients: make(map[string]chan models.WSEvent),
	}

	r.Broadcast = func(event models.WSEvent) {
		event.RoomID = r.ID
		r.State.Seq++
		event.Seq = r.State.Seq
		
		for pid, ch := range r.clients {
			select {
			case ch <- event:
			default:
				log.Printf("Warning: Dropped message for player %s in room %s", pid, r.ID)
			}
		}
	}
	return r
}

// Run starts the room actor's command processing loop.
func (r *Room) Run() {
	log.Printf("Room %s: Actor loop started", r.ID)
	for cmd := range r.Inbox {
		result := r.dispatch(cmd)
		if result.Error != nil {
			log.Printf("Room %s: Command error: %v", r.ID, result.Error)
			continue
		}
		for _, event := range result.Events {
			r.Broadcast(event)
		}
	}
	log.Printf("Room %s: Actor loop stopped", r.ID)
}

// dispatch routes the command to the relevant service and handles panics safely.
func (r *Room) dispatch(cmd models.Command) (result models.Result) {
	defer func() {
		if err := recover(); err != nil {
			log.Printf("Room %s: PANIC in dispatch: %v", r.ID, err)
			result = models.Result{
				Error: fmt.Errorf("internal server error during command dispatch"),
			}
		}
	}()

	switch cmd.Type {
	case "internal_register_client":
		reg := cmd.Internal.(models.ClientRegistration)
		r.clients[reg.PlayerID] = reg.Channel
		log.Printf("Room %s: Player %s connected", r.ID, reg.PlayerID)
		result.Events = append(result.Events, models.WSEvent{
			Type:    "player_connected",
			Payload: json.RawMessage(fmt.Sprintf(`{"playerId": "%s"}`, reg.PlayerID)),
		})
	case "internal_unregister_client":
		pid := cmd.Internal.(string)
		delete(r.clients, pid)
		log.Printf("Room %s: Player %s disconnected", r.ID, pid)
		result.Events = append(result.Events, models.WSEvent{
			Type:    "player_disconnected",
			Payload: json.RawMessage(fmt.Sprintf(`{"playerId": "%s"}`, pid)),
		})
	default:
		// Placeholders for game services
		log.Printf("Room %s: Processed command %s from %s", r.ID, cmd.Type, cmd.PlayerID)
		// For Phase 0 stub, we can just echo it back
		result.Events = append(result.Events, models.WSEvent{
			Type:    fmt.Sprintf("%s_ack", cmd.Type),
			Payload: cmd.Payload,
		})
	}

	return result
}
