import { useState } from 'react';

function Image(props) {
    const [imgs, setImgs] = useState('v');
    if(!props) {
        return <>.</>
    }
    const src = `/playmobil/photos/${props.nr}/${props.k}.jpg`;

    return <div className={`imagethumb ${imgs}`} key={`img-${props.k}`} style={{backgroundImage: `url(${src})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
        <img alt={props.nr} src={src} style={{visibility: 'hidden'}}
            onLoad={({target:img}) => {
                setImgs(img.offsetWidth > img.offsetHeight ? 'h': 'v');
            }}
        />
    </div>
}

export default Image;
