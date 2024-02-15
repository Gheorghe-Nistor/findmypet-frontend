import Image from 'next/image'

const ApplicationLogo = props => (
    <div className="flex flex-col items-center justify-center">
        <Image src="/logo.png" width={64} height={64} alt="Logo" />
        <h1 className="text-xl font-bold">FindMyPet</h1>
    </div>
)

export default ApplicationLogo
