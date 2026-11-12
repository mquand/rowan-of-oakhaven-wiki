// Từ điển tra cứu tên tiếng Việt và link cho vật phẩm, công thức quà tặng
export const GIFT_REGISTRY = {
  // Recipes
  tra_sen_an_than: { name: 'Trà Sen An Thần', type: 'recipe', icon: 'tea-bag', href: '/database/recipes#tra_sen_an_than' },
  tra_dau_bang_tuyet: { name: 'Trà Dâu Băng Tuyết', type: 'recipe', icon: 'tea-bag', href: '/database/recipes#tra_dau_bang_tuyet' },
  tra_oai_huong_ngan_sao: { name: 'Trà Oải Hương Ngàn Sao', type: 'recipe', icon: 'tea-bag', href: '/database/recipes#tra_oai_huong_ngan_sao' },
  tra_hoa_cuc_mat_ong: { name: 'Trà Cúc Mật Ong Ấm', type: 'recipe', icon: 'tea-bag', href: '/database/recipes#tra_hoa_cuc_mat_ong' },
  tra_sam_nui_da: { name: 'Trà Sâm Núi Đá', type: 'recipe', icon: 'tea-bag', href: '/database/recipes#tra_sam_nui_da' },
  bread_brioche: { name: 'Bánh Mì Brioche Hoa Cúc', type: 'recipe', icon: 'cake', href: '/database/recipes#bread_brioche' },
  banh_quy_gung: { name: 'Bánh Quy Gừng Giòn Rụm', type: 'recipe', icon: 'cake', href: '/database/recipes#banh_quy_gung' },
  pie_bi_ngo_mat: { name: 'Bánh Pie Bí Ngô Mật', type: 'recipe', icon: 'cake', href: '/database/recipes#pie_bi_ngo_mat' },
  cake_strawberry: { name: 'Bánh Tart Dâu Tuyết', type: 'recipe', icon: 'cake', href: '/database/recipes#cake_strawberry' },
  banh_sung_bo: { name: 'Bánh Sừng Bò Bơ Vàng', type: 'recipe', icon: 'cake', href: '/database/recipes#bread_brioche' },

  // Items / Ingredients / Seeds
  seed_sen_tea: { name: 'Hạt Trà Sen Tuyết', type: 'item', icon: 'plant', href: '/database/items/seed_sen_tea' },
  seed_lumiberry: { name: 'Hạt Dâu Dạ Quang', type: 'item', icon: 'plant', href: '/database/items/seed_lumiberry' },
  seed_silver_wheat: { name: 'Hạt Lúa Mì Bạc', type: 'item', icon: 'plant', href: '/database/items/seed_silver_wheat' },
  seed_star_lavender: { name: 'Hạt Oải Hương Sao', type: 'item', icon: 'plant', href: '/database/items/seed_star_lavender' },
  seed_sun_daisy: { name: 'Hạt Cúc Mặt Trời', type: 'item', icon: 'plant', href: '/database/items/seed_sun_daisy' },
  seed_sweet_pumpkin: { name: 'Hạt Bí Ngô Mật', type: 'item', icon: 'plant', href: '/database/items/seed_sweet_pumpkin' },

  item_cinnamon: { name: 'Quế Thơm Oakhaven', type: 'item', icon: 'package', href: '/database/items/item_cinnamon' },
  item_sugar: { name: 'Đường Mía Tinh Khiết', type: 'item', icon: 'package', href: '/database/items/item_sugar' },
  item_lantern_firefly: { name: 'Đèn Lồng Đom Đóm', type: 'item', icon: 'sparkle', href: '/database/items/item_lantern_firefly' },
  item_sun_daisy: { name: 'Hoa Cúc Mặt Trời', type: 'item', icon: 'plant', href: '/database/items/item_sun_daisy' },
  item_sweet_pumpkin: { name: 'Bí Ngô Mật Chín Vàng', type: 'item', icon: 'package', href: '/database/items/item_sweet_pumpkin' },

  la_tra_sen: { name: 'Lá Trà Sen Tuyết', type: 'item', icon: 'plant', href: '/database/items/la_tra_sen' },
  dau_rung: { name: 'Dâu Tuyết Dạ Quang', type: 'item', icon: 'plant', href: '/database/items/dau_rung' },
  oai_huong: { name: 'Hoa Oải Hương Sao', type: 'item', icon: 'plant', href: '/database/items/oai_huong' },
  mat_ong: { name: 'Mật Ong Hoa Rừng', type: 'item', icon: 'package', href: '/database/items/mat_ong' },
  bot_mi: { name: 'Bột Mì Bạc Thượng Hạng', type: 'item', icon: 'grains', href: '/database/items/bot_mi' },
  bo_tuoi: { name: 'Bơ Tươi Oakhaven', type: 'item', icon: 'package', href: '/database/items/bo_tuoi' },
  trung_ga_sao: { name: 'Trứng Gà Sao Ánh Kim', type: 'item', icon: 'package', href: '/database/items/trung_ga_sao' },
  gung_cay: { name: 'Củ Gừng Núi Ấm', type: 'item', icon: 'plant', href: '/database/items/gung_cay' },
  hoa_cuc: { name: 'Hoa Cúc Mặt Trời Khô', type: 'item', icon: 'plant', href: '/database/items/hoa_cuc' },
  nhan_sam_nui: { name: 'Nhân Sâm Núi Cổ', type: 'item', icon: 'plant', href: '/database/items/nhan_sam_nui' },

  // Minerals & Gems & Monster Drops
  quang_dong: { name: 'Quặng Đồng Rực Đỏ', type: 'item', icon: 'mountains', href: '/database/items/quang_dong' },
  quang_sat: { name: 'Quặng Sắt Thép Đen', type: 'item', icon: 'mountains', href: '/database/items/quang_sat' },
  quang_vang: { name: 'Quặng Vàng Rực Rỡ', type: 'item', icon: 'mountains', href: '/database/items/quang_vang' },
  da_tinh_the: { name: 'Đá Tinh Thể Trong Suốt', type: 'item', icon: 'diamond', href: '/database/items/da_tinh_the' },
  tinh_the_bang: { name: 'Tinh Thể Băng Vĩnh Cửu', type: 'item', icon: 'diamond', href: '/database/items/tinh_the_bang' },
  tinh_the_lua: { name: 'Tinh Thể Hỏa Diệm Sơn', type: 'item', icon: 'diamond', href: '/database/items/tinh_the_lua' },
  long_vu_huyen_ao: { name: 'Lông Vũ Huyền Ảo', type: 'item', icon: 'sparkle', href: '/database/items/long_vu_huyen_ao' },
  bot_sao: { name: 'Bột Bụi Sao Lấp Lánh', type: 'item', icon: 'sparkle', href: '/database/items/bot_sao' },
  nam_phat_quang: { name: 'Nấm Đêm Phát Quang', type: 'item', icon: 'plant', href: '/database/items/nam_phat_quang' },
  nhua_cay_co: { name: 'Nhựa Cây Cổ Thụ', type: 'item', icon: 'package', href: '/database/items/nhua_cay_co' },
  manh_vo_bong_dem: { name: 'Mảnh Vỡ Hắc Ám', type: 'item', icon: 'sparkle', href: '/database/items/manh_vo_bong_dem' },
};

export function lookupGift(id) {
  if (!id) return null;
  if (GIFT_REGISTRY[id]) return GIFT_REGISTRY[id];

  // Fallback định dạng đẹp
  const readable = id
    .replace(/^item_|^seed_/, '')
    .split('_')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  return {
    name: readable,
    type: 'item',
    icon: 'package',
    href: `/database/items`,
  };
}
