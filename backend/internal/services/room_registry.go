package services

import (
	"sync"
)

// RoomRegistry manages the lifecycle of active game rooms.
type RoomRegistry struct {
	rooms map[string]*Room
	mu    sync.RWMutex
}

// NewRoomRegistry creates a new registry.
func NewRoomRegistry() *RoomRegistry {
	return &RoomRegistry{
		rooms: make(map[string]*Room),
	}
}

// CreateRoom initializes a new room and starts its actor loop.
func (r *RoomRegistry) CreateRoom(id string) *Room {
	r.mu.Lock()
	defer r.mu.Unlock()

	if existing, ok := r.rooms[id]; ok {
		return existing
	}

	room := NewRoom(id)
	r.rooms[id] = room
	go room.Run()

	return room
}

// GetRoom retrieves an active room by ID.
func (r *RoomRegistry) GetRoom(id string) (*Room, bool) {
	r.mu.RLock()
	defer r.mu.RUnlock()
	room, ok := r.rooms[id]
	return room, ok
}

// RemoveRoom stops the room actor and removes it from the registry.
func (r *RoomRegistry) RemoveRoom(id string) {
	r.mu.Lock()
	defer r.mu.Unlock()

	if room, ok := r.rooms[id]; ok {
		close(room.Inbox) // Stops the actor loop
		delete(r.rooms, id)
	}
}
