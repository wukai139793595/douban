// pages/search/search.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  moveToMovie:function(e){
    let movieUrl ,
        id = e.currentTarget.dataset.id;
    wx.request({
      url: app.globalData.dbBase + '/v2/movie/subject/' +id,
      method:'GET',
      header: { 'content-type': 'json'},
      success:(res)=>{
        console.log(res)
        let mUrl = res.data.mobile_url;

      },
      fail:(err)=>{
        console.log(err)
      }
    })
  },
  backToHome:function(e){
    wx.navigateBack({
      delta:1
    })
  },
  showList:function(listArr){
    console.log(listArr);
    var result = [];
    listArr.forEach((ele)=>{
      var imgUrl = ele.images.small,
          movie = ele.title,
          id = ele.id,
          detail = ele.rating.average + '分/' +ele.year +'/'+ ele.casts.reduce((p,i)=>{
            return p+i.name
          },'');
      result.push({
        imgUrl:imgUrl,
        movie:movie,
        detail:detail,
        id : id
      })
    })
    this.setData({
      result:result
    })
  },

  searchMovie:function(e){
    var dbUrl =app.globalData.dbBase+app.globalData.searchUrl+e.detail.value;
    wx.request({
      url: dbUrl,
      method: 'GET',
      header:{'content-type':'json'},
      success: (res)=>{
        var listArr = res.data.subjects;
        this.showList(listArr);
      },
      fail:(err)=>{
        console.log(err)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
