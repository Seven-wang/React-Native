import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';
import PromotionApi from '../apis/PromotionApi';
import {
  EventEmitter
} from 'events';

let _dataSource = {
  cities: null,
  hotels: {},
  pageConfig:{},
}

let _addAndUpdateCities = function(cities) {
  _dataSource.cities = cities;
}

let _existCities = function() {
  return !!_dataSource.cities;
}

let _addAndUpdateHotels = function(cityId, hotels) {
  _dataSource.hotels[cityId] = hotels;
}

let _existHotels = function(cityId) {
  return !!_dataSource.hotels[cityId];
}

let _addAndUpdatePageConfig = function(pageConfig) {
  _dataSource.pageConfig = pageConfig;
}

let _existPageConfig = function(route) {
  return !!_dataSource.pageConfig[route];
}

let _splitIntoRows = function(arr, col) {
  let result = [];
  for(let i = 0; i < arr.length; i += col) {
    result.push(arr.slice(i, i + col));
  }
  return result;
}

let PromotionStore = Object.assign({}, EventEmitter.prototype, {

  fetchCities: function() {
    return _dataSource.cities;
  },

  fetchHotels: function(cityId, row, col) {
    let data = _dataSource.hotels[cityId];
    return _splitIntoRows(data, col).slice(0, row);
  },

  fetchPageConfig: function(route) {
    return _dataSource.pageConfig[route];
  },

  emitCitiesChange: function(route) {
    this.emit(AppConstants.CHANGE_CITIES_EVENT + route);
  },

  emitHotelsChange: function(route) {
    this.emit(AppConstants.CHANGE_HOTELS_EVENT + route);
  },

  addCitiesChangeListener: function(route) {
    this.emit(AppConstants.CHANGE_CITIES_EVENT + route);
  },

  removeCitiesChangeListener: function(route, callback) {
    this.removeListener(AppConstants.CHANGE_CITIES_EVENT + route, callback);
  },

  addHotelsChangeListener: function(route, callback) {
    this.on(AppConstants.CHANGE_HOTELS_EVENT + route, callback);
  },

  removeHotelsChangeListener: function(route, callback) {
    this.removeListener(AppConstants.CHANGE_HOTELS_EVENT + route, callback);
  },

  emitPageConfigChange: function(route) {
    this.emit(AppConstants.CHANGE_PAGECONFIG_EVENT + route);
  },

  addPageConfigChangeListener: function(route, callback) {
    this.on(AppConstants.CHANGE_PAGECONFIG_EVENT + route, callback);
  },

  removePageConfigChangeListener: function(route, callback) {
    this.removeListener(AppConstants.CHANGE_PAGECONFIG_EVENT + route, callback);
  },

});

AppDispatcher.register(function(action) {

  switch (action.actionType) {
    case AppConstants.FETCH_HOTELS_ACTION:
      if(_existHotels(action.cityId)) {
        PromotionStore.emitHotelsChange(action.route);
      } else {
        PromotionApi.fetchHotels(action.cityId,
          function(data){
            if(data.IsError){
              return;
            }
            let ohotels = data.value;
            let hotels = [];
            for(let i = 0; i < ohotels.length; i++) {
              let hotel = ohotels[i];
              hotels.push({
                hotelName: hotel.hotelName,
                hotelImage: hotel.hotelImageUrl,
                price: hotel.price,
                star: hotel.hotelLevel,
                hotelId: hotel.hotelId,
                paytype: '预定',
              });
            }
            _addAndUpdateHotels(action.cityId, hotels);
            PromotionStore.emitHotelsChange(action.route);
          },
          function(err){
            console.log(err);
          }
        );
      }
      break;
    case AppConstants.FETCH_CITIES_ACTION:
      if(_existCities()) {
        PromotionStore.emitCitiesChange(action.route);
      } else {
        PromotionApi.fetchCities(function(data){
            if(data.IsError){
              return;
            }
            let ocities = data.value;
            let cities = [];
            for(let i = 0; i < ocities.length; i++) {
              let city = ocities[i];
              cities.push({
                cityId: city.promCityDataID,
                cityNameCN: city.cityNameCN,
                cityNameEN: city.cityNameEN,
              });
            }
            _addAndUpdateCities(cities);
            PromotionStore.emitCitiesChange(action.route);
          },
          function(err){
            console.log(err);
          }
        );
      }
      break;
    case AppConstants.FETCH_PAGECONFIG_ACTION:
      if(_existPageConfig(action.route)) {
        PromotionStore.emitPageConfigChange(action.route);
      } else {
        PromotionApi.fetchPageConfig(function(data){
          _addAndUpdatePageConfig(data);
          PromotionStore.emitPageConfigChange(action.route);
        },
        function(err){
          console.log(err);
        });
      }
      break;
    default:
      // no nop
  }

});

export default PromotionStore;
