import AppConstants from '../constants/AppConstants';
import AppDispatcher from '../dispatcher/AppDispatcher';

class PromotionActions {

  static fetchHotels(cityId, route) {
    AppDispatcher.dispatch({
      actionType: AppConstants.FETCH_HOTELS_ACTION,
      cityId: cityId,
      route: route
    });
  }

  static fetchPageConfig(route) {
    AppDispatcher.dispatch({
      actionType: AppConstants.FETCH_PAGECONFIG_ACTION,
      route: route
    })
  }

}

export default PromotionActions;
