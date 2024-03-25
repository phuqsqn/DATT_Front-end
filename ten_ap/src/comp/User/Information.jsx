import React, { useEffect, useState } from "react";
import { set } from 'react-hook-form';
import httpService from "../service/http.service";
import { useParams } from "react-router";
import { Backdrop, Box, Fade, Modal } from "@mui/material";
import './information.css';
import storageService from "../service/storage.service";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

const Information = () => {
    const [account, setAccount] = useState({})
    const [isReload, setIsReload] = useState(false);
    const [cateBig, setCateBig] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams()
    const [open, setOpen] = React.useState(false);
    const handleOpen = (item) => {
        setOpen(true);
    };
    const handleClose = () => setOpen(false);
    useEffect(() => {
        httpService.get(`/api/accounts/information/${id}`, {}).then(data => {
            setAccount(data.data)
            console.log(data.data)
        })
    }, [])
    
    useEffect(() => {
        httpService.get("/api/categoryBig", {}).then(data => {
          setCateBig(data.data)
        })
      }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        httpService.patch(`/api/accounts/${id}`, { body: account })
            .then((data) => {
                setOpen(false);
                setIsReload(!isReload)
            },
            )
    }
    const handleLogOut = () => {
        storageService.remove("role")
        storageService.remove("access_token")
        navigate('/login')
    
      }
    // useEffect((id)=>{
    //     httpService.get(`/api/accounts/information/${id}`).then(data =>{
    //         console.log(data.data)
    //     })
    // },[])
    return (
        <>
        <div className="header_index">
        <div className="menu_header">

          <div className="item_productt">
            <h5><Link className="auth" to='/login'>Đăng Nhập</Link></h5>
          </div>
          <div className="item_productt" >
            <h5><Link className="auth" to='/register'>Đăng Ký</Link></h5>
          </div>
        </div>
        <div className="menu_header2">
          <div className="item_product"><a>message</a></div>
          <div className="item_product"><a>Email</a></div>
          <div className="item_product"><a>Phone</a></div>
        </div>
      </div>
      <div className="menu_index">
        <img
          className="logo_index"
          width={"190px"}
          src="https://goldidea.vn/upload/123/thiet-ke-logo-the-face-shop.png"
          alt=""
        />

        <div>
          {cateBig && cateBig.length > 0 &&(
            <div className="cateBig">
          {cateBig.map((item)=>(
              <ul>
                <li><Link className="item_cate" to={item.link}>{item.name}</Link></li>
              </ul>
              ))}
              </div>
              )}
        </div>
        <Link className="cart" to='/cart'><img
          width={"50px"}
          height={"50px"}
          src="https://cdn.pixabay.com/photo/2017/03/29/04/09/shopping-icon-2184065_1280.png"
          alt=""
        /></Link>
      </div>
            <div className="Sum_hoso">
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    slots={{ backdrop: Backdrop }}
                    slotProps={{
                        backdrop: {
                            timeout: 500,
                        },
                    }}
                >
                    <Fade style={{ width: "420px", height: "500px", border: "0px", borderRadius: "5px" }} in={open}>
                        <Box sx={style}>
                            <button style={{ margin: "0px" }} onClick={() => setOpen(false)}>x</button>
                            <div className="slog"><h1 className="dis">EDIT ACCOUNT</h1></div> <br />
                            <form className="formedit" onSubmit={handleSubmit}>
                                <label className="Boxname">Fullname:</label><br />
                                <input className="inpedit" type="text" value={account?.fullname} onChange={e => setAccount({ ...account, fullname: e.target.value })} /><br />
                                <label className="Boxname">Dob:</label><br />
                                <input className="inpedit" type="text" value={account?.dob} onChange={e => setAccount({ ...account, dob: e.target.value })} /><br />
                                <label className="Boxname">Phone:</label><br />
                                <input className="inpedit" type="text" value={account?.phone} onChange={e => setAccount({ ...account, phone: e.target.value })} /><br />
                                <label className="Boxname">Avatar</label><br />
                                <input className="inpedit" type="text" value={account?.avatar} onChange={e => setAccount({ ...account, avatar: e.target.value })} /><br />
                                <button className="submitedit" type="submit">Edit</button>
                            </form>
                        </Box>
                    </Fade>
                </Modal>
                <div className="Sum_Statis">
                <div className="Ho_So">
                    <h1>Hồ Sơ Thông Tin</h1>
                </div>
                <hr/>
                <div className="sum"><div className="tieude2">Tài khoản:</div> <div className="ingame">{account?.username}</div></div>
                <div className="sum"><div className="tieude2">Họ và tên:</div> <div className="ingame">{account?.fullname}</div></div>
                <div className="sum"><div className="tieude2" >Ngày Sinh:</div> <div className="ingame">{account?.dob}</div></div>
                <div className="sum"><div className="tieude2">Số điện thoại:</div> <div className="ingame">{account?.phone}</div></div>
               
                </div>
                <div className="statis_right">
                    <div className="avatar_logout">
                   
                    <h3><span>
                    <h2>Avatar:</h2><img
          className="avatar_ac"
          src={account?.avatar}
          alt=""
        /></span></h3>
            <div className="menu_avt">
            <button
                className="OnlickEdit"
                    onClick={() => {
                        setOpen(true)
                    }}
                >
                    CHỈNH SỬA
                </button>
            {
              storageService.get("role") &&
              <button className="OnlickEdit" onClick={handleLogOut}>ĐĂNG XUẤT</button>
            }
            </div>
                    </div>
                </div>
                
            </div>
            <div className="tintuc">
        <div className="tintuc_top">
          <h1>Tin Tức</h1>
        </div>
        <div className="tintuc_bottom">
          <div className="item_tintuc"><iframe width="100%" height="100%" src="https://www.youtube.com/embed/8bMZUNEiGLI?si=gUsV8uNdrtuLVUvq" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div>
          <div className="item_tintuc"><iframe width="100%" height="100%" src="https://www.youtube.com/embed/XY-TVcmCGYw?si=ZmG1eewfWneYuYeJ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div>
          <div className="item_tintuc"><iframe width="100%" height="100%" src="https://www.youtube.com/embed/afcAr_alvpA?si=OVtHyG5-lw5bgzAY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div>
        </div>
      </div>
      <br></br>
      <div className="hover_logo">
        <ul>
          <li><Link to="https://www.facebook.com/profile.php?id=100054721666294">   <img
            width={"35px"}
            src="https://i.pinimg.com/474x/16/b8/22/16b82240a640db6fb6c18297fc1dcfd3.jpg"
            alt=""
          /></Link></li>
          <li><Link to="https://www.facebook.com/profile.php?id=100054721666294">   <img
            width={"35px"}
            src="https://thumbs.dreamstime.com/z/youtube-logo-icon-voronezh-russia-november-square-black-color-164586300.jpg?w=768"
            alt=""
          /></Link></li>
          <li><Link to="https://www.facebook.com/profile.php?id=100054721666294">   <img
            width={"35px"}
            src="https://thumbs.dreamstime.com/z/twitter-logo-bird-isolated-over-white-background-social-media-networking-communications-symbol-breaking-news-130861855.jpg?w=768"
            alt=""
          /></Link></li>
          <li><Link to="https://www.facebook.com/profile.php?id=100054721666294">   <img
            width={"35px"}
            src="https://brasol.vn/wp-content/uploads/2022/09/logo-instagram-vector.jpg"
            alt=""
          /></Link></li>
        </ul>
      </div>
      <div className="footer_index">
        <div className="logo">
          <img
            width={"280px"}
            src="https://goldidea.vn/upload/123/thiet-ke-logo-the-face-shop.png"
            alt=""
          />
          <h4>Địa Chỉ : <span>219/7 Trần Hưng Đạo TP.Đà Nẵng</span></h4>
          <h4>Số Điện Thoại: <span>0349090947</span></h4>
          <h4>Email : <span>Huynhngocphuqs@gmai.com</span></h4>
          <h4>Mở cửa từ 8:00 AM đến 9:00 PM tất cả các ngày trong tuần</h4>

        </div>
        <div className="menu">
          <h3>MENU</h3>
          <ul>
            <li><Link to ="" className="menu_li">Trang chủ</Link></li>
            <li><Link to ="/Product" className="menu_li">Sản Phẩm</Link></li>
            <li><Link className="menu_li">Tin Tức</Link></li>
            <li><Link className="menu_li">Liên Hệ</Link></li>
            <li><Link className="menu_li">Đơn Hàng</Link></li>
          </ul>
        </div>
        <div className="menu">
        <h3>TIN TỨC</h3>
        <ul>
            <li><Link className="menu_li">Sale 30%</Link></li>
            <li><Link className="menu_li">Sản Phẩm Mới</Link></li>
            <li><Link className="menu_li">Sản Phẩm Hot</Link></li>
            <li><Link className="menu_li">Sản Phẩm Lỗi</Link></li>
           
          </ul>
        </div>
        <div className="menu"><h3>DỊCH VỤ</h3>
        <ul>
            <li><Link className="menu_li">ZaloPay</Link></li>
            <li><Link className="menu_li">Hoàn Trả</Link></li>
            <li><Link className="menu_li">Chăm Sóc KH</Link></li>
            <li><Link className="menu_li">Trao Đổi TT</Link></li>
          </ul></div>
      </div>
      <div className="footer_hover">
        <p>Coppy.@huynhngocphuqs@gmail.com</p>
      </div>
        </>
    )
}
export default Information;