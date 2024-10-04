import unknownArtist from '@/assets/images/unknown_artist.png';
import unknownTrack from '@/assets/images/unknown_track.png';
import { Image } from 'react-native';

const unknownArtistImageUri = Image.resolveAssetSource(unknownArtist).uri;
const unknownTrackImageUri = Image.resolveAssetSource(unknownTrack).uri;

export { unknownArtistImageUri, unknownTrackImageUri };
