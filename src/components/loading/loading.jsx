import axios from "axios";
import React ,{useEffect,useState} from 'react';
import './loading.scss';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: 'red',
  },
}));
const Loading = () => {
  
  const [post,setPost]= useState(null)
  const [loading,setLoading]= useState(false);
  
    const fetchFunc = async () => {
        try{
            const data = await axios
        .get("https://api.themoviedb.org/3/4e44d9029b1270a757cddc766a1bcb63")
        .then(res =>{
            const {body}=Response
            setPost(body)
        })
        setLoading(true);
        }
        catch (e) {
            console.log(e);
        }
    };
    useEffect(() => {
        fetchFunc();
        },[]);
  return (
    <div className="sweetloading">
      {loading ? () : }
        
        
        />
    </div>
  );
}

export default Loading;