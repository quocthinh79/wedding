export const WEDDING_CONFIG = {
  date: new Date('2026-05-10T10:00:00+07:00'),
  bride: {
    name: 'Giai Nhân',
    fullName: 'Đống Giai Nhân',
    photo: '/assets/images/bride-circle.png',
  },
  groom: {
    name: 'Quốc Thịnh',
    fullName: 'Lê Quốc Thịnh',
    photo: '/assets/images/groom-circle.png',
  },
  family: {
    groom: {
      father: 'Lê Văn Minh',
      mother: 'Võ Thị Hồng Liên',
      address: '844 Ấp Bình Thắng, Xã Phú Giáo, TP. HCM',
    },
    bride: {
      father: 'Đống Văn Điểu',
      mother: 'Mai Ngọc Hiền',
      address: 'Hẻm 72 Nguyễn Thị Tồn, P. Biên Hòa, Tỉnh Đồng Nai',
    },
  },
  events: {
    groomDay: {
      label: 'Ngày Nhà Trai',
      date: new Date('2026-05-10T10:00:00+07:00'),
      lunarDate: 'Nhằm ngày 24 tháng 03 năm Bính Ngọ',
      venueName: 'Tại tư gia',
      address: '844 Ấp Bình Thắng, Xã Phú Giáo, TP. HCM',
      mapUrl: 'https://maps.app.goo.gl/NrQXNEYVct4W2hU96?g_st=ic',
      partyName: 'Tiệc nhà trai',
      partyTime: '11:00, Chủ nhật, 10/05/2026',
    },
    brideDay: {
      label: 'Ngày Nhà Gái',
      date: new Date('2026-05-03T10:00:00+07:00'),
      lunarDate: 'Nhằm ngày 17 tháng 03 năm Bính Ngọ',
      venueName: 'Nhà hàng tiệc cưới Lộc Vừng',
      address:
        'Hẻm 703, K1 - 129 - Đường Bùi Hữu Nghĩa, phường Biên Hòa, tỉnh Đồng Nai',
      mapUrl: 'https://maps.app.goo.gl/W3Nzeyme2uTfxJCN6?g_st=ic',
      partyName: 'Tiệc nhà gái',
      partyTime: '11:00, Chủ nhật, 03/05/2026',
    },
  },
  venue: {
    ceremony: {
      name: 'Tại tư gia',
      address: '844 Ấp Bình Thắng, Xã Phú Giáo, TP. HCM',
      time: '10:00, Chủ nhật, 10/05/2026',
    },
    reception: {
      name: 'Nhà hàng tiệc cưới Lộc Vừng',
      address:
        'Hẻm 703, K1 - 129 - Đường Bùi Hữu Nghĩa, phường Biên Hòa, tỉnh Đồng Nai',
      time: '10:00, Chủ nhật, 03/05/2026',
    },
  },
};
