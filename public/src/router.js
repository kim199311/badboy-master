import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index'
import Lives from './views/Lives'
import LiveDetails from './views/LiveDetails'
import Venues from './views/Venues'
import VenueDetails from './views/VenueDetails'
import Artists from './views/Artists'
import ArtistDetails from './views/ArtistDetails'
import User from './views/User'
import Profile from './views/Profile'
import Favs from './views/Favs'
import Orders from './views/Orders'
import NotFound from './views/NotFound'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/lives',
      name: 'lives',
      component: Lives
    },
    {
      path: '/lives/:kws',
      name: 'lives',
      component: Lives
    },
    {
      path: '/lives/:starttime/:endtime',
      name: 'lives',
      component: Lives
    },
    {
      path: '/live_details/:tid',
      name: 'live_details',
      component: LiveDetails,
      props:true
    },
    {
      path: '/venues',
      name: 'venues',
      component: Venues
    },
    {
      path: '/venue_details/:vid',
      name: 'venue_details',
      component: VenueDetails,
      props:true
    },
    {
      path: '/artists',
      name: 'artists',
      component: Artists
    },
    {
      path: '/artist_details/:aid',
      name: 'artist_details',
      component: ArtistDetails,
      props:true
    },
    {
      path: '/user',
      name: 'user',
      component: User,
      children:[
        {
          path: '/user/profile',
          name: 'profile',
          component: Profile
        },
        {
          path: '/user/favs',
          name: 'favs',
          component: Favs
        },
        {
          path: '/user/orders',
          name: 'orders',
          component: Orders
        }
      ]
    },
    {
      path: '/not_found',
      name: 'not_found',
      component: NotFound
    }
  ]
})
