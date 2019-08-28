http://localhost:5050
首页: 
--即将上演: 
----/tours/recent 全国范围内查询最近的四场演出场次
----/tours/recent?cid=n 在某一城市内查询最近的四场演出场次
--演出日历:
----/tours/bymonth?y=年&m=月 全国范围内查询指定月份中每天演出场数
----/tours/bymonth?y=年&m=月&cid=城市编号 在某一城市内查询指定月份中每天演出场数
--热门演出:
----/tours/hot 全国范围内查询时间最近的，想看的人最多的，最热的四场演出场次
----/tours/hot?cid=n 在某一城市内查询时间最近的，想看的人最多的，最热的四场演出场次
--音乐现场:
----/venues/hot 全国范围内查询从今往后，演出场次最多的两个现场
----/venues/hot?cid=n 在某一城市内查询从今往后，演出场次最多的两个现场
--热门音乐人:
----/artists/hot 所有艺人中查询粉丝最多的8位艺人

*********************finished**********************

演出列表页面:
--查询条件:  
----演出城市列表:
------/cities/
----音乐现场列表:
------/venues/  全国范围内查询热门的现场列表
------/venues/?cid=n  指定某个城市范围内查询热门的现场列表
----风格列表:
------/styles/
--按城市/现场/时间/风格查询演出场次:
----/tours/list/?cid=城市号&vid=现场号&stid=风格号&starttime=开始时间&endtime=结束时间&pno=页码&psize=每页条目数
--关键词查询演出场次:
----/tours/kws?kws=关键词1 关键词2&pno=页码&psize=每页条目

****************************finished******************************

演出现场列表页
--演出城市列表:
----/cities/
--按关键词查询现场:
----/venues/list/?kws=关键词1 关键词2&pno=页码&psize=每页条目数  在全国范围内,按关键词搜索现场
----/venues/list/?cid=城市号&kws=关键词1 关键词2&pno=页码&psize=每页条目数 在指定城市内，按关键词查询现场

****************************finished******************************

音乐人列表页面
--风格列表:
----/styles/
--按风格和关键词查询音乐人列表
----/artists/list/?stid=风格号&kws=关键词1 关键词2...&pno=页码&psize=每页条目数

****************************finished******************************

演出详情页:
--/tours/details/?tid=n

****************************finished******************************

音乐现场详情页: 
--查询现场的基本信息
----/venues/details/?vid=现场编号
--查询现场上方演出日历
----/tours/bymv/?vid=现场编号&y=年份&m=月份
--查询现场所有演出列表
----/tours/list/?vid=现场编号&pno=页码&psize=每页条目数
--查询现场的演出所涉及的所有艺人
----/artists/byvenue/?vid=现场编号&pno=页码&psize=每页条目数

****************************finished******************************

音乐人详情页
--查询音乐人基本信息
----/artists/details?aid=音乐人编号
--查询音乐人最近的演出列表
----/tours/byartist?aid=音乐人编号
--查询音乐人相关的现场列表
----/venues/byartist?aid=音乐人编号&pno=页码&psize=每页条目数

****************************finished******************************

登录
--post请求: /user/signin 参数:uname和upwd和remember
----返回结果中包含token字符串，需要保存在localstorage中
判断是否登录
--/user/islogin 参数: remember, 需要从localstorage中读取token字符串在请求头中携带token字符

****************************finished******************************

*以下接口都需要从localstorage中读取token字符串在请求头中携带token字符*
用户页面
--个人信息
----/user/profile
--收藏的演出
----/user/favs?pno=n&psize=m
--订单页面
----/orders?status=n&pno=m&psize=k
------status=100,查全部, status=0查未付款，status=1查已付款
----post请求: /orders/pay 带tkid参数

演出详情页
--添加收藏
----post请求: /user/addfav 带tid参数
--购买
----post请求: /orders/addticket 带tid参数和count参数

艺人详情页
--添加关注
----post请求: /user/addfans 带aid参数