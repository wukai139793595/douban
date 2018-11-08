// pages/home/home.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inTheaters:[

    ],
    comingSoon:[

    ]
  },
  moveToMore:function(e){
    var typeId = e.currentTarget.dataset.typeId;
    console.log(typeId);
    wx.showToast({
      title: '正在加载',
      icon:'loading',
      duration:2000
    })
    wx.navigateTo({
      url: '../movie-more/movie-more?typeId='+typeId,
      success:(res)=>{
        wx.hideToast();
      }
    })
  },
  moveToSearch:function(e){
    wx.navigateTo({
      url: '../search/search',
    })
  },
  getMovieListData:function(url,_type){
    wx.showToast({
      title: '正在加载',
      icon:'loading',
      duration:10000
    })
    wx.request({
      url: url,
      type: 'GET',
      header: {'content-type':'json'},
      success:(res)=>{
        this.setData({
          [_type]:res.data.subjects
        })
      },
      fail: (err)=>{
        console.log(err)
      },
      complete:()=>{
        wx.hideToast();
      }

    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let inTheatersUrl =app.globalData.dbBase + app.globalData.inTheaters + '?start=0&&count=10',
      comingSoonUrl = app.globalData.dbBase + app.globalData.comingSoon + '?start=0&&count=10';
    this.getMovieListData(inTheatersUrl , 'inTheaters');
    this.getMovieListData(comingSoonUrl, 'comingSoon')
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})