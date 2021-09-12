/*eslint-disable*/
import { useRef, useState } from 'react';
import './FileUploader.css';

function FileUploader(props) {
    let [fileUrl, setFileUrl] = useState(null);
    let hiddenFileInput = useRef();
    function handleClick(e) {
        hiddenFileInput.current.click();
    }
    function handleChange(e) {
        let imageFile = e.target.files;
        props.setFiles(imageFile);
        var array = [];
        for (let i = 0; i < imageFile.length; i++) {
            let imageUrl = URL.createObjectURL(imageFile[i]);
            array.push(imageUrl);
        }
        setFileUrl(array);
    };


    return (
        <div className="file-upload">
            <button onClick={handleClick} type="button">사진 등록</button>
            <input type="file" ref={hiddenFileInput} accept='image/jpg, image/png, image/jpeg, image/gif' name="shopImg" multiple onChange={handleChange} style={{ display: 'none' }} />
            <div className="image-list">
                {showImg()}
            </div>
        </div>
    )
    function showImg() {
        var array = [];
        for(let i=0 ; i<fileUrl?.length ; i++){
            array.push(<div key={i} className="file-thumbnail"><img src={fileUrl[i]} /></div>)
        }
        return array;
    }

}

export default FileUploader;