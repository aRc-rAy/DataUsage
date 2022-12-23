import { React, useState } from "react";
// import './App.css'
import { MapContainer, TileLayer, Popup, Circle } from "react-leaflet";

import mapdata from "../data.json";

const Mymap = () => {
	const [usageData, setusageData] = useState(null);
	function getColor(c) {
		if (c > 500) {
			return "#03254c";
		} else if (c > 300) {
			return "#1167b1";
		} else if (c > 100) {
			return "#2a9df4";
		} else return "#d0efff";
	}
	return (
		<MapContainer center={[34.0522, -70]} zoom={3} scrollWheelZoom={true}>
			<TileLayer
				attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
				url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
			/>

			{mapdata.map((eachData) => (
				<Circle
					key={eachData.id}
					center={[eachData.Latitude, eachData.Longitude]}
					radius={eachData.data * 500}
					eventHandlers={{
						click: () => {
							setusageData(eachData);
						},
					}}
					pathOptions={{
						color: getColor(eachData.data),
						fillColor: getColor(eachData.data),
					}}
					// stroke={false}
				/>
			))}

			{usageData && (
				<Popup
					position={[usageData.Latitude, usageData.Longitude]}
					onClose={() => {
						setusageData(null);
					}}
				>
					<div>
						<h3>Region : {usageData.region}</h3>
						<p>Total Usages: {usageData.data}</p>
					</div>
				</Popup>
			)}
		</MapContainer>
	);
};

export default Mymap;
