// pages/movie-more/movie-more.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    _intheaters:true,
    _comingsoon:false,
    intheaters:{
      offset:0,
      total: 0,
      movies:[]
    },
    comingsoon:{
      offset:0,
      total:0,
      movies:[]
    }
  },
  loadMore:function(e){
    var typeId;
    if(this.data._intheaters){
      typeId = 'intheaters'
    }else{
      typeId = 'comingsoon'
    }
    if(this.data[typeId].offset < this.data[typeId].total){
      this.getData(typeId);
    }

  },
  changeBar:function(e){
    var typeBar = e.currentTarget.dataset.typeBar;
    if(e.currentTarget.dataset.typeBar == 'intheaters'){
      this.setData({
        _intheaters: true,
        _comingsoon: false
      })  
    }else{
      this.setData({
        _intheaters: false,
        _comingsoon: true
      })
    }
    if(!this.data[typeBar].movies.length ){
      this.getData(typeBar)
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  getData:function(typeId){
    let url;
    if (typeId == 'comingsoon') {
      url = app.globalData.dbBase + app.globalData.comingSoon + '?start=' + this.data[typeId].offset + '&&count=5';
      this.setData({
        _intheaters: false,
        _comingsoon: true
      })
    } else {
      url = app.globalData.dbBase + app.globalData.inTheaters + '?start=' + this.data[typeId].offset + '&&count=5';
      this.setData({
        _intheaters: true,
        _comingsoon: false
      })
    }
    wx.showToast({
      title: '正在加载',
      icon: 'loading',
      duration: 10000
    })
    wx.request({
      url: url,
      header: { 'content-type': 'json' },
      type: 'GET',
      success: (res) => {
        let subjects = res.data.subjects;
        let offset = subjects.length || 0;
        let total = res.data.total || 0;
        let movieArr = [];
        console.log(this.data[typeId].offset + offset);
        subjects.forEach((ele1) => {
          let allCasts = ele1.casts.reduce((p, ele) => {
            return p + ele.name + "/";
          }, "");
          let allDirects = ele1.directors.reduce((p, ele) => {
            return p + ele.name + "/";
          }, "")
          let allGenres = ele1.genres.reduce((p, ele) => {
            return p + ele + "/";
          }, "")
          let temp = {
            ...ele1,
            allCasts,
            allDirects,
            allGenres
          }
          movieArr.push(temp);
        })

        this.setData({
          [typeId]: {
            offset: (this.data[typeId].offset + offset),
            total: total,
            movies: [...this.data[typeId].movies,...movieArr]
          }
        })
      },
      fail: (err) => {
        console.log(err)
      },
      complete: () => {
        wx.hideToast();
      }

    })
  },
  onLoad: function (options) {

    let typeId = options.typeId;
    this.getData(typeId);

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