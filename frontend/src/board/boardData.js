export const COLORS = {
  sideBottom: 0x5eead4,
  sideLeft: 0xfb7185,
  sideTop: 0xfbbf24,
  sideRight: 0x818cf8,
  corner: 0x1a1a3a,
  tax: 0x6b2a2a,
  chance: 0x5a4a1a,
  community: 0x1a3a2a,
  transport: 0x1a2a4a,
  utility: 0x2a2a3a,
  freeParking: 0x1a3a2a,
  goToJail: 0x4a1a1a,
};

const tiles = [
  { pos:0,  name:'GO',            label:'GO',     type:'go',          group:null,         price:0,    color:COLORS.corner },
  { pos:1,  name:'Githurai',      label:'Gith.',  type:'property',    group:'Terracotta',  price:600,  rent:[60,300,900,2700,5500],   color:COLORS.sideBottom },
  { pos:2,  name:'C.Chest',       label:'+',      type:'community',   group:null,         price:0,    color:COLORS.community },
  { pos:3,  name:'Eastleigh',     label:'East.',  type:'property',    group:'Terracotta',  price:600,  rent:[60,300,900,2700,5500],   color:COLORS.sideBottom },
  { pos:4,  name:'Gov Tax',       label:'TAX',    type:'tax',         group:null,         price:1500, color:COLORS.tax },
  { pos:5,  name:'Maasai Mara',   label:'Mara',   type:'transport',   group:'Nat. Park',   price:2000, color:COLORS.sideBottom },
  { pos:6,  name:'Ngong Road',    label:'Ngong',  type:'property',    group:'Sky Blue',    price:1000, rent:[80,400,1200,3600,7500],  color:COLORS.sideBottom },
  { pos:7,  name:'Chance',        label:'?',      type:'chance',      group:null,         price:0,    color:COLORS.chance },
  { pos:8,  name:'Thika Road',    label:'Thika',  type:'property',    group:'Sky Blue',    price:1000, rent:[80,400,1200,3600,7500],  color:COLORS.sideBottom },
  { pos:9,  name:'Jogoo Road',    label:'Jogoo',  type:'property',    group:'Sky Blue',    price:1200, rent:[100,500,1500,4500,9000], color:COLORS.sideBottom },
  { pos:10, name:'Jail',          label:'JAIL',   type:'jail',        group:null,         price:0,    color:COLORS.corner },
  { pos:11, name:'Westlands',     label:'West.',  type:'property',    group:'Maasai Pink', price:1400, rent:[120,600,1800,5400,11000],  color:COLORS['Maasai Pink'] },
  { pos:12, name:'KPLC',          label:'KPLC',   type:'utility',     group:'Utility',     price:1500, color:COLORS.utility },
  { pos:13, name:'Ngara',         label:'Ngara',  type:'property',    group:'Maasai Pink', price:1400, rent:[120,600,1800,5400,11000],  color:COLORS['Maasai Pink'] },
  { pos:14, name:'Upper Hill',    label:'U.Hill', type:'property',    group:'Maasai Pink', price:1600, rent:[140,700,2100,6300,12500],  color:COLORS['Maasai Pink'] },
  { pos:15, name:'Amboseli',      label:'Ambo.',  type:'transport',   group:'Nat. Park',   price:2000, color:COLORS.transport },
  { pos:16, name:'Kilimani',      label:'Kili.',  type:'property',    group:'Sav. Orange', price:1800, rent:[160,800,2400,7200,14000], color:COLORS['Savanna Orange'] },
  { pos:17, name:'C.Chest',       label:'+',      type:'community',   group:null,         price:0,    color:COLORS.community },
  { pos:18, name:'Kileleshwa',    label:'Kile.',  type:'property',    group:'Sav. Orange', price:1800, rent:[160,800,2400,7200,14000], color:COLORS['Savanna Orange'] },
  { pos:19, name:'Lavington',     label:'Lav.',   type:'property',    group:'Sav. Orange', price:2000, rent:[180,900,2700,8100,16000], color:COLORS['Savanna Orange'] },
  { pos:20, name:'Uhuru Park',    label:'FREE',   type:'free_parking',group:null,         price:0,    color:COLORS.freeParking },
  { pos:21, name:'Parklands',     label:'Park.',  type:'property',    group:'Sunset Red',  price:2200, rent:[200,1000,3000,9000,17500],color:COLORS['Sunset Red'] },
  { pos:22, name:'Chance',        label:'?',      type:'chance',      group:null,         price:0,    color:COLORS.chance },
  { pos:23, name:'Riverside',     label:'Riv.',   type:'property',    group:'Sunset Red',  price:2200, rent:[200,1000,3000,9000,17500],color:COLORS['Sunset Red'] },
  { pos:24, name:'Spring Valley', label:'Spr.V',  type:'property',    group:'Sunset Red',  price:2400, rent:[220,1100,3300,9900,19500],color:COLORS['Sunset Red'] },
  { pos:25, name:'Tsavo East',    label:'Tsavo',  type:'transport',   group:'Nat. Park',   price:2000, color:COLORS.transport },
  { pos:26, name:'Runda',         label:'Runda',  type:'property',    group:'Sav. Gold',   price:2600, rent:[240,1200,3600,10800,21000],color:COLORS['Savanna Gold'] },
  { pos:27, name:'Gigiri',        label:'Gigiri', type:'property',    group:'Sav. Gold',   price:2600, rent:[240,1200,3600,10800,21000],color:COLORS['Savanna Gold'] },
  { pos:28, name:'Nairobi Water', label:'N.Wat',  type:'utility',     group:'Utility',     price:1500, color:COLORS.utility },
  { pos:29, name:'Nyari',         label:'Nyari',  type:'property',    group:'Sav. Gold',   price:2800, rent:[260,1300,3900,11700,23000],color:COLORS['Savanna Gold'] },
  { pos:30, name:'Go to Jail',    label:'→JAIL',  type:'go_to_jail',  group:null,         price:0,    color:COLORS.goToJail },
  { pos:31, name:'Loresho',       label:'Lore.',  type:'property',    group:'Acacia Green',price:3000, rent:[280,1400,4200,12600,25000],color:COLORS['Acacia Green'] },
  { pos:32, name:'Ridgeways',     label:'Ridg.',  type:'property',    group:'Acacia Green',price:3000, rent:[280,1400,4200,12600,25000],color:COLORS['Acacia Green'] },
  { pos:33, name:'Chance',        label:'?',      type:'chance',      group:null,         price:0,    color:COLORS.chance },
  { pos:34, name:'Rosslyn',       label:'Ross.',  type:'property',    group:'Acacia Green',price:3200, rent:[300,1500,4500,13500,26500],color:COLORS['Acacia Green'] },
  { pos:35, name:'Lake Nakuru',   label:'Nakuru', type:'transport',   group:'Nat. Park',   price:2000, color:COLORS.transport },
  { pos:36, name:'C.Chest',       label:'+',      type:'community',   group:null,         price:0,    color:COLORS.community },
  { pos:37, name:'Muthaiga',      label:'Muth.',  type:'property',    group:'Royal Gold',  price:3500, rent:[350,1750,5250,15750,31000],color:COLORS['Royal Gold'] },
  { pos:38, name:'Luxury Tax',    label:'TAX',    type:'tax',         group:null,         price:1000, color:COLORS.tax },
  { pos:39, name:'Karen',         label:'Karen',  type:'property',    group:'Royal Gold',  price:4000, rent:[400,2000,6000,18000,35000],color:COLORS['Royal Gold'] },
];

const S = 64;
const T = 33;

function getColRow(pos) {
  if (pos === 0) return { col: 10, row: 10 };
  if (pos >= 1 && pos <= 9) return { col: 10 - pos, row: 10 };
  if (pos === 10) return { col: 0, row: 10 };
  if (pos >= 11 && pos <= 19) return { col: 0, row: 20 - pos };
  if (pos === 20) return { col: 0, row: 0 };
  if (pos >= 21 && pos <= 29) return { col: pos - 20, row: 0 };
  if (pos === 30) return { col: 10, row: 0 };
  if (pos >= 31 && pos <= 39) return { col: 10, row: pos - 30 };
}

export function getTileRect(pos) {
  const { col, row } = getColRow(pos);
  const isCorner = pos % 10 === 0;
  if (isCorner) return { x: col * S, y: row * S, w: S, h: S };
  if (pos >= 1 && pos <= 9) return { x: col * S, y: row * S + S - T, w: S, h: T };
  if (pos >= 11 && pos <= 19) return { x: col * S, y: row * S, w: T, h: S };
  if (pos >= 21 && pos <= 29) return { x: col * S, y: row * S, w: S, h: T };
  if (pos >= 31 && pos <= 39) return { x: col * S + S - T, y: row * S, w: T, h: S };
}

export function getTileCenter(pos) {
  const r = getTileRect(pos);
  return { x: r.x + r.w / 2, y: r.y + r.h / 2 };
}

export const BOARD_ORIGIN = { x: 36, y: 10 };
export const CELL_SIZE = S;
export const TILE_DEPTH = T;

export function getSide(pos) {
  if (pos >= 0 && pos <= 10) return 'bottom';
  if (pos >= 11 && pos <= 20) return 'left';
  if (pos >= 21 && pos <= 30) return 'top';
  return 'right';
}

export default tiles;
