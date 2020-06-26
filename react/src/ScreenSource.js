import React, { useState, useEffect } from 'react';
import './App.css';
import { List, Avatar } from 'antd';
import Nav from './Nav';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

function ScreenSource(props) {
	const [sourceList, setSourceList] = useState([]);
	const [selectedLang, setSelectedLang] = useState(props.selectedLang);

	useEffect(() => {
		async function fetchData() {
			var langue = 'fr';
			var country = 'fr';

			if (selectedLang === 'en') {
				langue = 'en';
				country = 'us';
			}
			props.changeLang(selectedLang);
			const response = await fetch(
				`https://newsapi.org/v2/sources?language=${langue}&country=${country}&apiKey=0c20d84a67dc4594ab651a1cdc7dca09`
			);
			const jsonResponse = await response.json();
			setSourceList(jsonResponse.sources);
		}
		fetchData();
	}, [selectedLang]);

	return (
		<div>
			<Nav />
			<div
				className="Banner"
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<img
					style={{ width: '40px', margin: '10px', cursor: 'pointer' }}
					src="/images/fr.png"
					alt="fr"
					onClick={() => setSelectedLang('fr')}
				/>
				<img
					style={{ width: '40px', margin: '10px', cursor: 'pointer' }}
					src="/images/uk.png"
					alt="uk"
					onClick={() => setSelectedLang('en')}
				/>
			</div>

			<div className="HomeThemes">
				<List
					itemLayout="horizontal"
					dataSource={sourceList}
					renderItem={(source) => (
						<List.Item>
							<List.Item.Meta
								avatar={<Avatar src={`/images/${source.category}.png`} />}
								title={
									<Link to={`/screenarticlesbysource/${source.id}`}>
										{source.name}
									</Link>
								}
								description={source.description}
							/>
						</List.Item>
					)}
				/>
			</div>
		</div>
	);
}

function mapStateToProps(state) {
	return { selectedLang: state.selectedLang };
}

function mapDispatchToProps(dispatch) {
	return {
		changeLang: function (selectedLang) {
			dispatch({ type: 'changeLang', selectedLang: selectedLang });
		},
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ScreenSource);
