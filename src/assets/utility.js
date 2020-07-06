exports.install = function (Vue, options) {
    Vue.prototype.listToString = function (list){
        var list_str = ""
        for(var i=0;i<list.length;i++){
          if(i == list.length-1){
            list_str = list_str + list[i].toString()
          }else{
            list_str = list_str + list[i].toString() + "/"
          }
          
        }
        return list_str
      },
      Vue.prototype.strToList = function(str){
          var list = []
          let str_list = str.split("/")
          for(var i=0;i<str_list.length;i++ ){
              let item =  str_list[i]
              if(item != ""){
                list.push(item+"")
              }
          }
          return list
      }
  };