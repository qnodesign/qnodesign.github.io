import { useEffect, useState  } from 'react';
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import './App.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import playmos from './playmobil.json'
import Image from './Image';
import FsLightbox from "fslightbox-react";
import { slide as Menu } from 'react-burger-menu'

function App() {
  const { tab } = useParams();
  const [data,setData] = useState([]);
  const [isOpen,setIsOpen] = useState(true);
	const [lightboxController, setLightboxController] = useState({
		toggler: false,
		slide: 1
	});
  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setData(playmos.playmos);
  },[])

  useEffect(() => {
    const getNumber = (tab) => {
        const idx = data.findIndex((e,c) => e.nr === tab);
        return idx > -1 ? idx : 0;
    }
    if(data.length) {
      setActiveTab(getNumber(tab));
    }
  },[data, tab])

  useEffect(() => {
    if(activeTab !== 'undefined' && data.length) {
      const path = `/playmobil/${data[activeTab].nr}`;
      navigate(path);
    }
  },[data, activeTab, navigate])

  if(!data.length) {
    return <>Loading...</>
  }

  const getTabs = () => {
    const tabs = data.map(o => <Tab key={`tab-${o.nr}`} className="tab" onClick={()=>setIsOpen(false)}>{o.nr}: {o.name}</Tab>)
    return (
      <Menu 
        onOpen={()=>setIsOpen(true)}
        onClose={()=>setIsOpen(false)}
        isOpen={isOpen} width={ 220 }
      >
        <TabList className="tablist">{tabs}</TabList>
      </Menu>
    )
  }

  const openLightboxOnSlide = (slide) => {
		setLightboxController({
			slide,
			toggler: !lightboxController.toggler,
		});
	}

  const renderImages = (nr,c) => {
    const imgs = Array.from(Array(c).keys());
    return <>{
      imgs.map((key,idx) => {
        return <span className="imagelightbox" onClick={() => openLightboxOnSlide(idx+1)} key={`image-${key}`}><Image k={key+1} nr={nr} /></span>
      })
    }</>
  }

  const PanelControl = ({nr}) => {
    const go = (dir) => {
      const currIdx = data.findIndex(e =>e.nr === tab)
      const last = data.length-1;
      let idx;
      if(dir === '-') {
        idx=currIdx-1 < 0 ? last : currIdx-1;
      }
      if(dir === '+') {
        idx=currIdx+1 > last ? 0 : currIdx+1;
      }
      const path = `/playmobil/${data[idx].nr}`;
      navigate(path);
    }

    const toLeft = () => {
      go('-')
      
    }
    const toRight = () => {
      go('+')
    }

    return (
      <div className="navigation">
        <h2>{nr}</h2>
        <div onClick={toLeft} className="left">&lsaquo; <span>vorig</span></div>
        <div onClick={toRight} className="right"><span>nächste</span> &rsaquo;</div>
      </div>
    )
    
  }

  const getTabPanels = () => {
    const tabpanels = data.map((o,idx) => {
      const { nr, name, images, category, price, desc, link } = o;
      const sources = Array.from(Array(images).keys()).map(key => `./photos/${nr}/${key+1}.jpg`);
      const fslight = { sources, toggler: lightboxController.toggler, slide: lightboxController.slide }
      return (
        <TabPanel key={`panel-${nr}`} className="tabpanel" value={activeTab} index={idx}>
          <h1><span>zu verkaufen</span></h1>
          <PanelControl nr={nr} />
          <h2>{name}</h2>
          {category && <p>{category}</p>}
          <h2>Verkaufspreis: {price} CHF </h2>
          <p className="vs">zzg Versandkosten</p>
          {renderImages(nr,images)}
          {desc && <p>{desc}</p>} 
          {link && <p className="link">Link: <a href={link} target="_blank" rel="noreferrer">{link}</a></p>} 
          <FsLightbox {...fslight} />
        </TabPanel>
      )
    })
    return <>
      {tabpanels}
    </> 
  }

  return (
    <div className="App">
        <Tabs
          selectedIndex={activeTab} 
          onSelect={(activeTab) => setActiveTab(activeTab)}
          className="tabs"
        >
          {getTabs()}
          {getTabPanels()}
        </Tabs>
    </div>
  );
}

export default App;