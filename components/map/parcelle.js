import React, {useEffect, useState, useCallback} from 'react'
import PropTypes from 'prop-types'

import {X} from 'react-feather'

import {contenanceToSurface} from '../../lib/surfaces'
import {getCommune} from '../../lib/api-geo'
import colors from '../../styles/colors'

const Parcelle = ({parcelle, close}) => {
  const [commune, setCommune] = useState(null)
  const {prefixe, section, numero, contenance, arpente, created, updated} = parcelle

  const fetchCommune = useCallback(async () => {
    const commune = await getCommune(parcelle.commune)
    setCommune(commune)
  }, [parcelle.commune])

  useEffect(() => {
    fetchCommune()
  }, [fetchCommune])

  return (
    <div className='parcelle-container'>
      <div className='header'>
        <div className='title'>Parcelle {prefixe} {section} {numero}</div>
        <div className='close' onClick={close}><X /></div>
      </div>
      <div className='content'>
        <div><b>Commune</b>: {commune ? `${commune.nom} - ${commune.code}` : '…'}</div>
        <div><b>Contenance cadastrale</b>: {contenanceToSurface(contenance)}</div>
        <div><b>Arpente</b>: {arpente || 'inconnu'}</div>
        <div><b>Créée le</b> {created}</div>
        <div><b>Mise à jour le</b> {updated}</div>
      </div>
      <style jsx>{`
        .parcelle-container {
          display: flex;
          flex-direction: column;
          background-color: #fff;
          padding: 0.5em
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid ${colors.darkGrey};
          padding: 0.5em;
        }

        .title {
          font-weight: bold;
        }

        .content {
          display: flex;
          flex-direction: column;
          padding: 0.5em;
        }

        .close:hover {
          cursor: pointer;
        }

        @media (max-width: 470px) {
          .parcelle-container {
            background-color: #fff;
            height: 100%;
          }
        }
        `}</style>
    </div>
  )
}

Parcelle.propTypes = {
  parcelle: PropTypes.shape({
    id: PropTypes.string.isRequired,
    commune: PropTypes.string.isRequired,
    prefixe: PropTypes.string,
    section: PropTypes.string.isRequired,
    numero: PropTypes.string.isRequired,
    contenance: PropTypes.number.isRequired,
    arpente: PropTypes.bool.isRequired,
    created: PropTypes.string.isRequired,
    updated: PropTypes.string.isRequired
  }).isRequired,
  close: PropTypes.func.isRequired
}

export default Parcelle
