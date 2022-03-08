const MensajeDe = ({name,txt}:any) => {
    return (
      <div className='w-full h-full chatDivDe chatFlow ' >
        <div className="flex msjDe">
          <div>
            <h4 className="text-lg font-bold">{name}</h4>
            <p className="mt-1">
              {txt}
            </p>
          </div>
          <div className="ml-4 flex-shrink-0">
            {/*<svg
              className="h-16 w-16 border border-gray-300 bg-white text-gray-300"
              preserveAspectRatio="none"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 200 200"
              aria-hidden="true"
            >*/}
              <img
                className="inline-block h-9 w-9 rounded-full"
                src="https://pm1.narvii.com/6442/ba5891720f46bc77825afc5c4dcbee06d3c66fe4_hq.jpg"
                alt=""
              />
              {/*<path vectorEffect="non-scaling-stroke" strokeWidth={1} d="M0 0l200 200M0 200L200 0" />*/}
            {/*</svg>*/}
          </div>
        </div>
      </div>
      )
}

export default MensajeDe