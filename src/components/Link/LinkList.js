import React, {useState, useEffect, useCallback} from 'react'
import {dbLinksRef} from "../../firebase/firebase";
import LinkItem from './LinkItem';

const LinkList = ({location}) => {

    const [links,setLinks] = useState([]);
    const isTrending = location.pathname.includes("trending");


    const getLinks = useCallback(() =>{
        if(isTrending){
            return dbLinksRef.orderBy("voteCount", "desc")
                   .onSnapshot(handleSnapshot);
        }
         return  dbLinksRef.orderBy("created", "desc")
                 .onSnapshot(handleSnapshot);
    }, [isTrending])
    

    useEffect(()=>{
       const unsubscribe = getLinks();
       return () => unsubscribe();
    },[isTrending, getLinks])

   

    const handleSnapshot = (snapshot) =>{
       const links = snapshot.docs.map((doc) => {
           return { id: doc.id, ...doc.data()}
       })
       setLinks(links);
    }


    return (
        <>
          {links.map((link, index) => (
              <LinkItem 
              key={link.id}
              showCount={true}
              url={`/link/${link.id}`}
              link={link}
              index={index+1}/>
          ))}  
        </>
    )
}

export default LinkList
