const chanceCards = [
  { id:'ch_01', deck:'chance', title:'Advance to Go. Collect KES 2,000.', effect:'move', target:0 },
  { id:'ch_02', deck:'chance', title:'Advance to Githurai. If unowned, you may buy it.', effect:'move', target:1 },
  { id:'ch_03', deck:'chance', title:'Advance to Ngong Road. If unowned, you may buy it.', effect:'move', target:6 },
  { id:'ch_04', deck:'chance', title:'Bank pays you a dividend of KES 500.', effect:'cash', amount:500 },
  { id:'ch_05', deck:'chance', title:'Go to Jail. Do not pass Go.', effect:'go_to_jail' },
  { id:'ch_06', deck:'chance', title:'Make general repairs. Pay KES 250 per lodge.', effect:'cash', amount:-250 },
  { id:'ch_07', deck:'chance', title:'Pay poor tax of KES 150.', effect:'cash', amount:-150 },
  { id:'ch_08', deck:'chance', title:'Advance to Westlands.', effect:'move', target:11 },
  { id:'ch_09', deck:'chance', title:'Elected Chairman! Pay each player KES 500.', effect:'cash', amount:-500 },
  { id:'ch_10', deck:'chance', title:'Building loan matures. Collect KES 1,500.', effect:'cash', amount:1500 },
  { id:'ch_11', deck:'chance', title:'Go back 3 spaces.', effect:'advance', target:-3 },
  { id:'ch_12', deck:'chance', title:'Advance to Karen. If unowned, you may buy it.', effect:'move', target:39 },
  { id:'ch_13', deck:'chance', title:'Take a trip to Maasai Mara!', effect:'move', target:5 },
  { id:'ch_14', deck:'chance', title:'You won a raffle! Collect KES 1,000.', effect:'cash', amount:1000 },
  { id:'ch_15', deck:'chance', title:'Get Out of Jail Free.', effect:'jail_free' },
  { id:'ch_16', deck:'chance', title:'Advance to Lavington. If unowned, you may buy it.', effect:'move', target:19 },
];

const communityCards = [
  { id:'cc_01', deck:'community', title:'Advance to Go. Collect KES 2,000.', effect:'move', target:0 },
  { id:'cc_02', deck:'community', title:'Bank error in your favor! Collect KES 2,000.', effect:'cash', amount:2000 },
  { id:'cc_03', deck:'community', title:'Doctor\'s fees. Pay KES 500.', effect:'cash', amount:-500 },
  { id:'cc_04', deck:'community', title:'From sale of matatu, you get KES 500.', effect:'cash', amount:500 },
  { id:'cc_05', deck:'community', title:'Get Out of Jail Free.', effect:'jail_free' },
  { id:'cc_06', deck:'community', title:'Go to Jail. Do not pass Go.', effect:'go_to_jail' },
  { id:'cc_07', deck:'community', title:'Holiday fund matures. Collect KES 1,000.', effect:'cash', amount:1000 },
  { id:'cc_08', deck:'community', title:'Income tax refund. Collect KES 200.', effect:'cash', amount:200 },
  { id:'cc_09', deck:'community', title:'It is your birthday! Collect KES 100 from each player.', effect:'cash', amount:100 },
  { id:'cc_10', deck:'community', title:'Life insurance matures. Collect KES 1,000.', effect:'cash', amount:1000 },
  { id:'cc_11', deck:'community', title:'Pay hospital fees of KES 1,000.', effect:'cash', amount:-1000 },
  { id:'cc_12', deck:'community', title:'Pay school fees of KES 500.', effect:'cash', amount:-500 },
  { id:'cc_13', deck:'community', title:'Receive KES 250 consultancy fee.', effect:'cash', amount:250 },
  { id:'cc_14', deck:'community', title:'Assessed for street repairs. Pay KES 400 per lodge.', effect:'cash', amount:-400 },
  { id:'cc_15', deck:'community', title:'Second prize in a beauty contest! Collect KES 100.', effect:'cash', amount:100 },
  { id:'cc_16', deck:'community', title:'You inherit KES 2,000.', effect:'cash', amount:2000 },
];

export function drawCard(deckType) {
  const deck = deckType === 'chance' ? chanceCards : communityCards;
  return deck[Math.floor(Math.random() * deck.length)];
}
;