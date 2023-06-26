import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { APP_NAME } from 'constants/app.constant'

const LOGO_SRC_PATH = 'https://cdn.discordapp.com/attachments/1029671812658892803/1118720064879861910/gaze.png'

const Logo = (props) => {
    const { type, mode, gutter, className, imgClass, style, logoWidth } = props

    return (
        <div
            className={classNames('logo', className, gutter)}
            style={{
                ...style,
                ...{ width: 120,height:120 },
            }}
        >
            <img
                className={imgClass}
                src={`${LOGO_SRC_PATH}`}
                alt={`${APP_NAME} logo`}
            />
        </div>
    )
}

Logo.defaultProps = {
    mode: 'light',
    type: 'full',
    logoWidth: 'auto',
}

Logo.propTypes = {
    mode: PropTypes.oneOf(['light', 'dark']),
    type: PropTypes.oneOf(['full', 'streamline']),
    gutter: PropTypes.string,
    imgClass: PropTypes.string,
    logoWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

export default Logo
