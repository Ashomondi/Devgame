package handlers

import (
	"encoding/json"
	"errors"

	"Devgame/backend/internal/models"
	"Devgame/backend/internal/services"
)

type TradeHandler struct {
	tradeService *services.TradeService
}

func NewTradeHandler(ts *services.TradeService) *TradeHandler {
	return &TradeHandler{
		tradeService: ts,
	}
}

// ProposeTradePayload mirrors the inbound JSON structure when a player hits "Propose Trade"
type ProposeTradePayload struct {
	DealID            string `json:"dealId"`
	CounterpartyID    string `json:"counterpartyId"`
	OfferedProperty   []int  `json:"offeredPropertyIds"`
	RequestedProperty []int  `json:"requestedPropertyIds"`
	CashOffered       int64  `json:"cashOffered"`
	CashRequested     int64  `json:"cashRequested"`
}

// HandleProposeTrade acts as the routing switch for incoming "propose_trade" commands
// HandleProposeTrade acts as the routing switch for incoming "propose_trade" commands
func (h *TradeHandler) HandleProposeTrade(userID string, gameState *models.GameState, rawMsg json.RawMessage) (*models.PendingDeal, error) {
	var payload ProposeTradePayload
	if err := json.Unmarshal(rawMsg, &payload); err != nil {
		return nil, errors.New("malformed trade proposal payload")
	}

	// 1. Convert payload arrays into our core models.TradeTerms block (matching Sospeter's property fields)
	terms := models.TradeTerms{
		OfferedPropertyIDs:   payload.OfferedProperty,
		RequestedPropertyIDs: payload.RequestedProperty,
	}

	// 2. Validate financial solvency of the proposer before locking the trade deal
	for _, p := range gameState.Players {
		if p.ID == userID {
			if p.Cash < payload.CashOffered {
				return nil, errors.New("insufficient liquidity: you cannot offer more liquid cash than you currently hold")
			}
			break
		}
	}

	// 3. Hand off the trade directly to our secure TradeService to lock down assets
	deal, err := h.tradeService.ProposeTrade(payload.DealID, userID, payload.CounterpartyID, terms)
	if err != nil {
		return nil, err
	}

	return deal, nil
}
