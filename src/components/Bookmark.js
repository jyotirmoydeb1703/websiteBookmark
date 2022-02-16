import React, { useState } from 'react'

export default function Bookmark() {

    const openGraphUrl = 'https://opengraph.io/api/1.1/site';
    const opengraphKey = 'f783e433-13ff-4bd6-98ec-6fb785a01a71';

    const [url, setUrl] = useState('');
    const [bookmark, setBookmark] = useState([]);

    const addNewBookmark = (e) => {
        e.preventDefault();
        const enCodedUrl = encodeURIComponent(url);
        fetch(`${openGraphUrl}/${enCodedUrl}?app_id=${opengraphKey}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                const newBookmak = {
                    title: data.hybridGraph.title,
                    image: data.hybridGraph.image,
                    url: data.hybridGraph.url
                }
                const newBookmarks = [...bookmark, newBookmak]
                setBookmark(newBookmarks)

            })
    }

    const removeBookmark = (e,url)=> { 
        e.preventDefault();
        const filtered = bookmark.filter((bookmark) => {
            return bookmark.url !== url;
          });
          setBookmark(filtered);

    }

    return (
        <>
            <form action="" onSubmit={addNewBookmark}>
                <h2>Website Bookmark App</h2>
                <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
                <input type="submit" value="Add" />
            </form>   
          <><hr/><br/></>
            <div className="displayBookmark">            
                {bookmark.map((bm, index) => (
                    <a
                        key={index}
                        href={bm.url}
                        className="bookmarkStyle"
                        target="_blank"
                    >
                        
                        <img src={bm.image} alt="" />
                        <>
                         <br/>
                        </>
                        <span>{bm.title}</span>
                        <>
                            <button className="crossButton" onClick={(e) => removeBookmark(e, bm.url)}>X</button>
                        </>
                    </a>
                    
                ))}

             
            </div>
        </>
    )
}

