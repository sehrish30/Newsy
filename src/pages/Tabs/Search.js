import React, {useState, useEffect, useCallback} from 'react'
import {IonPage,  IonContent, IonSearchbar} from '@ionic/react'
import SmallHeader from '../../components/Header/SmallHeader';
import LargeHeader from '../../components/Header/LargeHeader';
import {dbLinksRef} from '../../firebase/firebase' 
import LinkItem from '../../components/Link/LinkItem';

const Search = () => {

    const [links, setLinks] = useState([]);
    const [filter, setFilter] = useState("")
    const [filteredLinks, setFilteredLinks] = useState([]);

    const getInitialLinks = () =>{
        dbLinksRef.get()
        .then((snapshot) => {
            const links = snapshot.docs.map((doc)=>{
                return {id: doc.id, ...doc.data()}
            })
            setLinks(links);
        })
    }

    const handleSearch = useCallback(() =>{
        const query = filter.toLowerCase();
        const matchedLinks = links.filter((link) => {
            return (
                link.description.toLowerCase().includes(query) ||
                link.url.toLowerCase().includes(query) ||
                link.postedBy.name.toLowerCase().includes(query)
            )
        });
        setFilteredLinks(matchedLinks);
    }, [filter, links])

    useEffect(()=>{
        handleSearch();
    }, [handleSearch, filter])

    useEffect(()=> {
        getInitialLinks();
    })

    const handleChange = (evt)=>{
      if(evt.key === 'Enter'){
          setFilter(evt.target.value);
      }
    }

    

    return (
        <IonPage>
           <SmallHeader title="Search"/>
           <IonContent color="secondary" fullscreen>
               <LargeHeader title="Search"/>
               <IonSearchbar
               placeholder="Search"
               sellcheck="false"
               type="url"
            //    value={filter}
               onKeyDown = {handleChange}
               animated
                />
             {filteredLinks.map((filteredLink, index) => (
                 <LinkItem
                  key={filteredLink.id}
                  showCount = {false}
                  link = {filteredLink}
                  url ={`/link/${filteredLink.id}`}
                  />
             ))}   
           </IonContent>
        </IonPage>
    )
}

export default Search