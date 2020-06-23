import React, { useState, useEffect } from 'react';
import './App.css';
import { Card, Icon, Modal} from 'antd';
import Nav from './Nav'
import { connect } from 'react-redux';

const { Meta } = Card;

function ScreenArticlesBySource(props) {

  const [articleList, setArticleList] = useState([])

  const [visible, setVisible] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`https://newsapi.org/v2/top-headlines?sources=${props.match.params.id}&apiKey=0c20d84a67dc4594ab651a1cdc7dca09`);
      const jsonResponse = await response.json();
      setArticleList(jsonResponse.articles);
    }
    fetchData()
  },[])

  var showModal = (title, content) => {
    setVisible(true)
    setTitle(title)
    setContent(content)
  }

  var handleOk = e => {
    setVisible(false)
  }

  var handleCancel = e => {
    setVisible(false)
  }

  return (
    <div>
      <Nav/>
      <div className="Banner"/>
      <div className="Card">

        {articleList.map((article, i) => (

          <div style={{display:'flex',justifyContent:'center'}} key={i}>
          <Card
            style={{ 
            width: 300, 
            margin:'15px', 
            display:'flex',
            flexDirection: 'column',
            justifyContent:'space-between' }}
            cover={
            <img
                alt={article.title}
                src={article.urlToImage}
            />
            }
            actions={[
                <Icon type="read" key="ellipsis2" onClick={() => showModal(article.title,article.content)} />,
                <Icon type="like" key="ellipsis" onClick={() => props.addToWishList(article)} />
            ]}
            >
            <Meta
              title={article.title}
              description={article.description}
            />
          </Card>
          <Modal
            title={title}
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <p>{content}</p>
          </Modal>
          </div>

        ))}

      </div> 
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    addToWishList: function(article) { 
        dispatch( {type: 'addArticle',
          articleLiked: article
      } ) 
    }
  }
}

export default connect(
    null, 
    mapDispatchToProps
)(ScreenArticlesBySource);