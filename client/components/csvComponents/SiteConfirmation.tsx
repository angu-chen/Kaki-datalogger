import React from 'react'
import { ReleaseSites } from '../../../models/kaki'

interface Props {
  releaseSites: ReleaseSites[] | null
  setReleaseSites: React.Dispatch<React.SetStateAction<ReleaseSites[]>>
}

export default function SiteConfirmation({
  releaseSites,
  setReleaseSites,
}: Props) {
  if (releaseSites === null) return
  const handleChange = (
    index: number,
    key: string,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (!releaseSites) return
    const newData = e.target.value
    const updatedData = releaseSites.map((site, i) => {
      if (i === index) {
        return { ...site, [key]: newData }
      }
      return site
    })
    setReleaseSites(updatedData)
  }
  return (
    <div>
      {releaseSites.map((release, index) => {
        console.log(release)
        return (
          <div key={release.site}>
            <form className="">
              <label
                className="font-semibold"
                htmlFor={`site${index + 1}`}
              >{`Site ${index + 1}`}</label>
              <input
                className="border-gray-400 border p-1"
                onChange={(e) => {
                  handleChange(index, 'site', e)
                }}
                autoComplete="off"
                value={release ? release.site : 'ERROR'}
                name={`Site${index + 1}`}
                id={`Site${index + 1}`}
              />
            </form>
            <div>
              {release ? (
                release.kakiSubBands.map((band) => <p key={band}>{band}</p>)
              ) : (
                <p>ERROR</p>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
