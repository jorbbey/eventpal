// eslint-disable-next-line react/prop-types
const CarouselHeads = ({head, subHead}) => {
  return (
    <div className="my-10">
            <h1 className="capitalize font-bold text-3xl">{ head }</h1>
            <p className="text-lg text-gray-400">{subHead}</p>
    </div>
  )
}

export default CarouselHeads
