import React,{useState, useEffect} from 'react';
import './App.css';
import { List, Avatar} from 'antd';
import Nav from './Nav'
import { Link } from 'react-router-dom';

function ScreenSource() {

  const [sourceList, setSourceList] = useState([])

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('https://newsapi.org/v2/sources?language=fr&country=fr&apiKey=0c20d84a67dc4594ab651a1cdc7dca09');
      const jsonResponse = await response.json();
      setSourceList(jsonResponse.sources)
    }
    fetchData()
  },[])

  return (
    <div>
      <Nav/>
      <div className="Banner"/>
      <div className="HomeThemes">
        <List
            itemLayout="horizontal"
            dataSource={sourceList}
            renderItem={source => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src={`/images/${source.category}.png`} />}
                  title={<Link to={`/screenarticlesbysource/${source.id}`}>{source.name}</Link>}
                  description={source.description}
                />
              </List.Item>
            )}
          />
        </div>
      </div>
  );
}

export default ScreenSource;
