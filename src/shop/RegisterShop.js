/*eslint-disable*/
import Select from 'react-select';
import './RegisterShop.css';
import { options, hour, minute } from '../util/time.js'
import ShopService from '../api/ShopService';
import FileUploader from '../util/FileUploader';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';
import { setMyShop } from '../redux/reducers/shopInfo_reducer';
import { useHistory } from 'react-router-dom';
function RegisterShop() {
    const dispatch = useDispatch();
    const history = useHistory();
    let [requiredHour, setRequiredHour] = useState('');
    let [requiredMinute, setRequiredMinute] = useState('');
    let [files, setFiles] = useState();
    const userInfo = useSelector(state => state.userInfo_reducer).userInfo;
    let [serviceInfo, setServiceInfo] = useState({
        serviceName: '',
        price: '',
        requiredTime: '',
        productInfo: ''
    });
    let [serviceInfoList, setServiceInfoList] = useState([]);


    const hourChange = useCallback((inputValue) => setRequiredHour(inputValue), []);
    const minuteChange = useCallback((inputValue) => setRequiredMinute(inputValue), []);

    const { serviceName, price, requiredTime, productInfo } = serviceInfo;

    const setVal = (e) => {
        const { name, value } = e.target;
        setServiceInfo({
            ...serviceInfo,
            [name]: value
        });
    }

    useEffect(() => {
        if (requiredHour && requiredMinute) {
            setServiceInfo({
                ...serviceInfo,
                requiredTime: requiredHour.value?.concat(requiredMinute.value),
            });
        }
    }, [requiredHour, requiredMinute])

    const onReset = (e) => {
        setServiceInfo({
            serviceName: '',
            price: '',
            requiredTime: '',
            productInfo: ''
        })
    }

    const customStyles = {
        menu: (provided, state) => ({
            ...provided,
            width: state.selectProps.width,
        }),

        container: (provided, state) => ({
            ...provided,
            width: state.selectProps.width,
        })
    }


    return (
        <div className="content-body register-shop">
            <div className="content-group">
                <div className="content-title">
                    <h4>매장 등록</h4>
                </div>
                <div className="content register-shop-info">
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <div className="shop-info">
                            <span className="shop-info-title">상호명</span>
                            <span className="shop-info-content">
                                <input type="text" name="shopName" required />
                            </span>
                        </div>
                        <div className="shop-info">
                            <span className="shop-info-title">연락처</span>
                            <span className="shop-info-content">
                                <input type="text" name="shopTel" required />
                            </span>
                        </div>
                        <div className="shop-info">
                            <span className="shop-info-title">주소</span>
                            <span className="shop-info-content">
                                <input type="text" name="address" required />
                            </span>
                        </div>
                        <div className="shop-info">
                            <span className="shop-info-title">매장 정보</span>
                            <span className="shop-info-content">
                                <textarea type="text" name="shopInfo" required />
                            </span>
                        </div>
                        <div className="shop-info block">
                            <div className="shop-info-title">영업시간</div>
                            <div className="shop-info-content run-time">
                                <div className="open-time">
                                    <div>오픈시간</div>
                                    <Select
                                        className="select"
                                        name="openTime"
                                        styles={customStyles}
                                        width='200px'
                                        options={options}
                                        placeholder="00:00"
                                    />
                                </div>
                                <div className="close-time">
                                    <div>마감시간</div>
                                    <Select
                                        className="select"
                                        name="closeTime"
                                        styles={customStyles}
                                        width='200px'
                                        options={options}
                                        placeholder="00:00"
                                    />
                                </div>
                            </div>

                        </div>
                        <div className="shop-info block">
                            <div className="shop-info-title serviceInfo">시술 정보</div>
                            <div className="shop-info-content serviceInfo">
                                <div className="service">
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td>시술명</td>
                                                <td colSpan="2"><input type="text" name="serviceName" onChange={(e) => { setVal(e) }} value={serviceName || ''}></input></td>
                                            </tr>
                                            <tr>
                                                <td>가격</td>
                                                <td colSpan="2"><input type="text" name="price" onChange={(e) => { setVal(e) }} value={price || ''}></input></td>
                                            </tr>
                                            <tr>
                                                <td>소요시간</td>
                                                <td><Select className="select" name="requiredHour" styles={customStyles} width='100px' options={hour} defaultValue={hour[0]} onChange={hourChange} /></td>
                                                <td><Select className="select" name="requiredMinute" styles={customStyles} width='100px' options={minute} defaultValue={minute[0]} onChange={minuteChange} /></td>
                                            </tr>
                                            <tr>
                                                <td>시술정보</td>
                                                <td colSpan="2"><textarea type="textarea" name="productInfo" onChange={(e) => { setVal(e) }} value={productInfo || ''}></textarea></td>
                                            </tr>
                                            <tr>
                                                <td colSpan="3">
                                                    <button type="button" onClick={addService}>확인</button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="save-list">
                                    {serviceInfoList.map(
                                        (d, index) =>
                                            <div className="save-service" key={index}>
                                                <div>
                                                    {d.serviceName}
                                                </div>
                                                <div>
                                                    {d.price}
                                                </div>
                                                <div>
                                                    {d.requiredTime}
                                                </div>
                                                <div>
                                                    {d.productInfo}
                                                </div>
                                                <div onClick={() => deleteService(index)}>삭제</div>
                                            </div>

                                    )}
                                </div>

                            </div>
                        </div>
                        <div className="shop-info block">
                            <div className="shop-info-title">매장 사진</div>
                            <div className="shop-info-content">
                                <FileUploader setFiles={setFiles} />
                            </div>
                        </div>
                        <div>
                            <input type="submit" value="등록" />
                        </div>
                    </form>

                </div>

            </div>
        </div>
    )
    function handleSubmit(e) {
        e.preventDefault();
        let openHour = e.target.openTime.value.substr(0, 2);
        let openMin = e.target.openTime.value.substr(2, 2);
        let closeHour = e.target.closeTime.value.substr(0, 2);
        let closeMin = e.target.closeTime.value.substr(2, 2);
        // console.log(new Date(0, 0, 0, openHour, openMin))
        var formData = new FormData();
        const shopDto = {
            shopName: e.target.shopName.value,
            shopTel: e.target.shopTel.value,
            shopAddress: e.target.address.value,
            shopInfo: e.target.shopInfo.value,
            openTime: new Date(2020, 0, 0, openHour, openMin),
            closeTime: new Date(2020, 0, 0, closeHour, closeMin),
            owner_id: userInfo.id,
        }
        formData.append("shopName", e.target.shopName.value);
        formData.append("shopAddress", e.target.address.value);
        formData.append("shopTel", e.target.shopTel.value);
        formData.append("shopInfo", e.target.shopInfo.value);
        formData.append("openTime", new Date(2020, 0, 0, openHour, openMin));
        formData.append("closeTime", new Date(2020, 0, 0, closeHour, closeMin));
        formData.append("owner", userInfo.id);
        const arr = files;

        if (arr != null) {
            for (let i = 0; i < arr.length; i++) {
                formData.append("files", arr[i])
            }
        }
        for (let i = 0; i < serviceInfoList.length; i++) {
            formData.append("serviceInfoList", JSON.stringify(serviceInfoList[i]));
        }
        formData.append("serviceInfoList", JSON.stringify(serviceInfo));

        ShopService.registerShop(formData)
            .then((res) => {
                dispatch(setMyShop(res.data));
                var arr = [];
                for (let i = 0; i < res.data.image.length; i++) {
                    arr.push(res.data.image[i].uri)
                }
                if (res.data.id !== '') {
                    history.push('/shopmanager');
                }
            });
    }

    function addService() {
        // if (serviceName && price && requiredTime && productInfo) {
        var array = [...serviceInfoList];

        array.push(serviceInfo);
        setServiceInfoList(serviceInfoList => array);
        onReset();
        // }
    }

    function deleteService(index) {
        var array = [...serviceInfoList];
        array.splice(index, 1);
        setServiceInfoList(serviceInfoList => array);
    }
}

export default RegisterShop;