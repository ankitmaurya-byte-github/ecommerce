import React from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { profileUpdate } from '../../../store/action/userAction'
function UpdateProfile() {
 const dispatch = useDispatch()
 const alert = useAlert()
 const { name, avatar, email } = useSelector(state => state.userData)
 const { isUpdated, loading } = useSelector(state => state.profile)
 const [userData, setUserData] = useState({})
 const [avatarPreview, setPreviewAvatar] = useState(avatar.url)

 const updateProfileAvatar = (e) => {
  const reader = new FileReader();
  reader.onload = () => {
   if (reader.readyState === 2) {
    setUserData({ ...userData, avatar: reader.result });
   }
  };

  reader.readAsDataURL(e.target.files[0]);
  // setUserData({ ...userData, avatar: e.target.files[0] });
  const file = URL.createObjectURL(e.target.files[0])

  setPreviewAvatar(file)
 }
 const handletProfileUpdate = async (e) => {
  const formdata = new FormData();
  // formdata.append('username', 'john_doe');
  Object.entries(userData).forEach(([key, value]) => {
   formdata.append(key, value)
  });
  dispatch(profileUpdate(userData))
 }

 useEffect(() => {

 }, [])
 return (
  <div>UpdateProfile</div>
 )
}

export default UpdateProfile