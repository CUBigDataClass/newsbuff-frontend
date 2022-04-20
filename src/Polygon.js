import { EditControl } from 'react-leaflet-draw';
import "leaflet-draw/dist/leaflet.draw.css";
import { FeatureGroup } from 'react-leaflet';

export default function Polygon() {

  return (
    <FeatureGroup>
      <EditControl
        position="topleft"
        draw={{
          rectangle: false,
          polyline: false,
          circle: false,
          circlemarker: false,
          marker: false
        }}
      />
    </FeatureGroup>
  )

}
