import { useHistory } from "react-router";

export default function NotPermissionPage() {
    const history = useHistory();
    const tempStyle = {
        display: 'flex',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        paddingTop: '100px',
        fontSize: '1.5rem'
    }
    setTimeout(function () {
        history.push("/")
    }, 2000)

    return (
        <div style={tempStyle}>
            <span>
                권한이 없는 페이지입니다. 메인 화면으로 이동합니다
            </span>
        </div>
    )
}