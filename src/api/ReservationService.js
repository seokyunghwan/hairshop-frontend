import axios from "axios";

const RESERVATION_API_BASE_URL = '/api/reservation'

class ReservationService {
    getReservationList(checkedDate, id){
        return axios.get(RESERVATION_API_BASE_URL + "/getAllReservation", {
            params: {
                date: checkedDate,
                shopId: id
            }
        });
    }

    getMyReservation(id, size = 5){
        return axios.get(RESERVATION_API_BASE_URL,{
            params:{
                id: id,
                size: size,
            }
        });
    }
    setReservation(reservationDto){
        return axios.post(RESERVATION_API_BASE_URL, reservationDto,{
            headers: {
                'Content-Type': 'application/json',
            }
        });
    }

    getReview(id, size = 5){
        return axios.get( RESERVATION_API_BASE_URL + "/review" , {
            params:{
                id: id,
                size: size
            }
        })
    }

    cancelReservation(id){
        return axios.delete(RESERVATION_API_BASE_URL+'?id='+id);
    }

    getPageInfo(link){
        return axios.get(link);
    }

    addStyle(reservationDto){
        return axios.put(RESERVATION_API_BASE_URL, reservationDto,{
            headers: {
                'Content-Type': 'application/json',
            }
        });
    }

    updateReview(id, review){
        return axios.post(RESERVATION_API_BASE_URL + "/review", {
            id, review
        })
    }

    getMainForManager(id){
        return axios.get(RESERVATION_API_BASE_URL + "/managerMain/" + id);
    }

}

export default new ReservationService();