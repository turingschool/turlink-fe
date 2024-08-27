import './ShortenedLinkPage.css'
import InputField from '../InputField/InputField'
import CopyLink from '../CopyLink/CopyLink'

const ShortenedLinkPage: React.FC = () => {

    return (
        <div className='shortened-link-wrapper'>
            <InputField />
            <CopyLink />
        </div>
    )
}

export default ShortenedLinkPage