import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import MyTable from '../../module/MyTable'
import Myindex from '../components/fxl/Myindex'
// 订单模块
import MyMessage from '../components/fxl/MyMessage'
import CommentView from '../components/fxl/CommentView'  // 用户晒单的显示组件
import CommentAudited from '../components/fxl/CommenAudited'  // 用户晒单 -- 已审核
import CommentUnAudited from '../components/fxl/CommenUnAudited'  // 用户晒单 -- 已审核
import Discount from '../components/fxl/Discount'  // 优惠券管理
import DiscountSent from '../components/fxl/DiscountSent'  // 优惠券管理  -- 已发布
import DiscountUnsent from '../components/fxl/DiscountUnsent'  // 优惠券管理  -- 未发布
import Message from '../components/fxl/Message'  // 消息管理
import MessageSent from '../components/fxl/MessageSent'  // 消息管理  -- 已发布
import MessageUnsent from '../components/fxl/MessageUnsent'  // 消息管理  -- 未发布

import MyOrder from '@/components/tmj/MyOrder'
import MyOrderAll from '@/components/tmj/MyOrderAll'
import MyOrderUnfill from '@/components/tmj/MyOrderUnfill'
import MyOrderSent from '@/components/tmj/MyOrderSent'
import MyOrderTake from '@/components/tmj/MyOrderTake'
import MyUser from '@/components/tmj/MyUser'/*用户管理部分*/

import GoodTable from '@/components/sjw/TableJW'
import GoodHead from '@/components/sjw/GoodHead'
import TextView from '@/components/fxl/TextView'
//=================hlr===============================
import activityMenu from '@/components/hlr/activityMenu'
import sented from '@/components/hlr/sented'
import unsent from '@/components/hlr/unsent'
import phystore from '@/components/hlr/phystore'
import hotToPic from '@/components/hlr/hotToPic'
import special from '@/components/hlr/special'
import trademark from '@/components/hlr/trademark'

// ===============================shouye
// import biaoqian from '@/components/xyc/biaoqian'
import biaoqian from '@/components/xyc/biaoqian'
import banxq from '@/components/xyc/banxq'
import redian from '@/components/xyc/redian'
import std from '@/components/xyc/std'
import cpxq from '@/components/xyc/cpxq'

//===================================================
Vue.use(Router);

export default new Router({
  routes: [
//=============================================xyc===============================



//=============================================xyc结束===============================

    {
      path: '/',
      name: 'Myindex',
      component: Myindex
    },
    {
      path: '/index',
      name: 'Myindex',
      component: Myindex
    },





    {
      path: '/3', // tmj用户拦截
      name: 'MyUser',
      component: MyUser,
    },
    {
      path: '/xyc', // 用户shouye组件
      name: 'biaoqian',
      component: biaoqian,
      children:[
        {
          path: '/xyc', // 用户shouye组件
          name: 'banxq',
          component: banxq,

        },
        {
          path: '/banxq', // 用户shouye组件
          name: 'banxq',
          component: banxq
        },
        {
          path: '/rdxq', // 用户shouye组件
          name: 'redian',
          component:redian
        },
        {
          path: '/std', // 用户shouye组件
          name: 'std',
          component:std
        },
        {
          path: '/cpxq', // 用户shouye组件
          name: 'cpxq',
          component:cpxq
        }

      ]
    },
    {//订单拦截
      path: '/4',//订单管理拦截
      name: 'MyOrder',
      component: MyOrder,
      children:[
        {
          path: '/4-1',//全部订单显示
          name: 'MyOrderAll',
          component: MyOrderAll,
        },
        {
          path: '/4-2',//待发货订单管理表格拦截
          name: 'MyOrderUnfill',
          component: MyOrderUnfill,
        },
        {
          path: '/4',//订单默认显示
          name: 'MyOrderAll',
          component: MyOrderAll,
        },
        {
          path: '/4-3',//已发货订单管理表格拦截
          name: 'MyOrderSent',
          component: MyOrderSent,
        },
        {
          path: '/4-4',//已收货订单管理表格拦截
          name: 'MyOrderTake',
          component: MyOrderTake,
        }
      ]
    },
    {//活动拦截
      path: '/hotToPic',
      name: 'hotToPic',
      component: hotToPic,
          children:[
          {
            path: '/hotToPic',
            name: 'activityMenu',
            component: activityMenu,
            children:[
                     {
                      path: '/hotToPic',
                      name: 'sented',
                      component: sented
                     },
                    {
                      path: '/sented',
                      name: 'sented',
                      component: sented
                     },
                    {
                      path: '/unsent',
                      name: 'unsent',
                      component: unsent,
                    },
                    {
                      path: '/phystore',
                      name: 'phystore',
                      component: phystore,
                    },
                    {
                        path: '/special',
                        name: 'special',
                        component: special,
                      },
                      {
                        path: '/trademark',
                        name: 'trademark',
                        component: trademark,
                      },
            ],
          },

      ]
    },
    {
      path: '/GoodTable',
      name: 'GoodTable',
      component: GoodTable
    },
    {
      path: '/GoodHead',
      name: 'GoodHead',
      component: GoodHead
    },
    {
      path: '/TextView',
      name: 'TextView',
      component: TextView
    },
    {
      path: '/MyMessage', // 管理员之间对话使用的组件
      name: 'MyMessage',
      component: MyMessage
    },
    {
      path: '/Comment', // 用户晒单的主组件
      name: 'Comment',
      component: CommentView,
      children:[
        {
          path: '/Comment', // 用户晒单已审核的组件
          name: 'CommentAudited',
          component: CommentAudited
        },
        {
          path: '/CUAudited', // 用户晒单未审核的组件
          name: 'CommentUnAudited',
          component: CommentUnAudited
        },

      ],
    },
    {
      path: '/Message', // 消息管理的组件
      name: 'Message',
      component: Message,
      children:[
        {
          path: '/Message', // 消息管理已发布 -- 默认
          name: 'MessageSent',
          component: MessageSent
        },
        {
          path: '/MessageSent', // 消息管理已发布
          name: 'MessageSent',
          component: MessageSent
        },
        {
          path: '/MessageUnsent', // 消息管理未发布
          name: 'MessageUnsent',
          component: MessageUnsent
        }
      ],
    },
    {
      path: '/Discount', // 优惠券组件
      name: 'Discount',
      component: Discount,
      children:[
        {
          path: '/Discount', // 优惠券已发布 -- 默认
          name: 'DiscountSent',
          component: DiscountSent
        },
        {
          path: '/DiscountSent', // 优惠券已发布
          name: 'DiscountSent',
          component: DiscountSent
        },
        {
          path: '/DiscountUnsent', // 优惠券未发布
          name: 'DiscountUnsent',
          component: DiscountUnsent
        }
      ]
    },
  ]
})
