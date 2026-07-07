package services

import (
	"sync"

	"Devgame/backend/internal/models"
)

type LiquidationService struct {
	mu          sync.RWMutex
	propService *PropertyService // Relies on your property mutations to safely drop lodges/mortgage
}

func NewLiquidationService(ps *PropertyService) *LiquidationService {
	return &LiquidationService{
		propService: ps,
	}
}

// CheckLiquidationCapacity calculates the maximum possible cash a player could raise in an emergency
func (s *LiquidationService) CheckLiquidationCapacity(player *models.PlayerState, playerProperties []*models.PropertyState) int64 {
	s.mu.RLock()
	defer s.mu.RUnlock()

	// Start with their current pocket cash
	maxCashRaised := player.Cash

	for _, prop := range playerProperties {
		if prop.OwnerID != nil && *prop.OwnerID == player.ID {
			// 1. Add cash value of selling developments (usually 50% of original purchase price)
			// Assuming a fixed base value for hackathon baseline rule, e.g., Ksh 1,000 per lodge sold
			if prop.LodgeCount > 0 {
				maxCashRaised += int64(prop.LodgeCount) * 1000
			}

			// 2. Add mortgage value if the property isn't already mortgaged
			// Assuming a standard mortgage liquidity value per property, e.g., Ksh 2,000
			if !prop.Mortgaged {
				maxCashRaised += 2000
			}
		}
	}

	return maxCashRaised
}
