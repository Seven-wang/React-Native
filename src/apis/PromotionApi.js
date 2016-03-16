/**
 * PromotionApi.js
 */

import AppConfigs from '../configs/AppConfigs';

function _getJsonp(url, params, success, error) {
  let cb = 'cb';
  let t = Date.now();
  let sUrl = '';
  let sParams = '';

  for(let i in params) {
    sParams += `&${i}=${params[i]}`;
  }
  sUrl = `${url}?callback=${cb}&${sParams}&t=${t}`;
  fetch(sUrl).then(function(response) {
    return response.text();
  }).then(function(text) {
    let s = text.substring((cb + '(').length, text.length-1);
    let data = JSON.parse(s);
    success(data);
  }).catch(function(e) {
    error(e);
  });
}

function _getJson(url, params, success, error) {
  let t = Date.now();
  let sUrl = '';
  let sParams = '';

  for(let i in params) {
    sParams += `&${i}=${params[i]}`;
  }
  sUrl = `${url}?t=${t}${sParams}`;
  fetch(sUrl).then(function(response) {
    return response.json();
  }).then(function(data) {
    success(data);
  }).catch(function(e) {
    error(e);
  });
}

class PromotionApi {

  static fetchHotels(cityId, success, error) {
    let params = {promCityDataId: cityId, promDataSourceId: AppConfigs.DataSourceId};
    _getJsonp(AppConfigs.HotelApiUrl, params, success, error);
  }

  static fetchCities(success, error) {
    let params = {promDataSourceId: AppConfigs.DataSourceId};
    _getJsonp(AppConfigs.CityApiUrl, params, success, error);
  }

  static fetchPageConfig(success, error) {
    _getJson(AppConfigs.PromoPageUrl, {}, success, error);
  }

}

export default PromotionApi;
