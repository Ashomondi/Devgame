package services

import (
	"errors"
	"sync"
	"time"

	"Devgame/backend/internal/models"
)

type TradeService struct {
	mu           sync.RWMutex
	activeDeals  map[string]*models.PendingDeal // Keyed by Deal ID
	propService  *PropertyService               // Dependency to ensure property ownership/locks
}

// NewTradeService instantiates your trading engine core
func NewTradeService(ps *PropertyService) *TradeService {
	return &TradeService{
		activeDeals: make(map[string]*models.PendingDeal),
		propService: ps,
	}
}

// ProposeTrade instantiates a deal state machine between two players
func (s *TradeService) ProposeTrade(dealID string, proposerID string, counterpartyID string, terms models.TradeTerms) (*models.PendingDeal, error) {
	s.mu.Lock()
	defer s.mu.Unlock()

	// Ensure there isn't a colliding active trade with this exact string ID
	if _, exists := s.activeDeals[dealID]; exists {
		return nil, errors.New("a trade deal with this ID already exists")
	}

	// 1. Core Rulebook Constraint: Proposers cannot trade with themselves
	if proposerID == counterpartyID {
		return nil, errors.New("cannot propose a trade deal to yourself")
	}

	// Calculate a baseline 30-second negotiation countdown window in Unix Milliseconds
	deadline := time.Now().Add(30 * time.Second).UnixNano() / int64(time.Millisecond)

	newDeal := &models.PendingDeal{
		ID:                 dealID,
		ProposerID:         proposerID,
		CounterpartyID:     counterpartyID,
		Phase:              models.DealPhaseNegotiating,
		LeadingOffer:       terms,
		LeadingOfferFromID: &proposerID,
		DeadlineMS:         deadline,
	}

	s.activeDeals[dealID] = newDeal
	return newDeal, nil
}