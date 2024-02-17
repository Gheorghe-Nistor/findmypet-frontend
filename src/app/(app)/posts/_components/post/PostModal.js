import Link from 'next/link'
import Button from '@/components/Button'
import LabeledFlexWrapper from '@/components/LabeledFlexWrapper'
import TypeTag from '../TypeTag'
import Reward from '../Reward'

const PostModal = ({ isOpen, onClose, post }) => {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <div className=" bg-[#20354b] w-[400px] p-5 rounded-lg shadow-lg border border-gray-700">
                {post?.type && <TypeTag type={post.type} />}
                <LabeledFlexWrapper className="gap-1">
                    {post?.title && (
                        <h1 className="text-xl font-bold">{post.title}</h1>
                    )}
                    {post?.reward && <Reward value={post.reward} />}
                    {post?.images && (
                        <img
                            src={post.images[0]}
                            width="300px"
                            alt="Misssing pet"
                        />
                    )}
                    <br />
                    <div className="flex justify-around w-full">
                        <Link href={`/posts/view/${post.id}`}>
                            <Button
                                onClick={onClose}
                                className="mt-1.5 mx-1 bg-blue-500 hover:bg-blue-600 focus:bg-blue-900">
                                View
                            </Button>
                        </Link>

                        <Button
                            onClick={onClose}
                            className="mt-1.5 mx-1 bg-red-500 hover:bg-red-600 focus:bg-red-900">
                            Close
                        </Button>
                    </div>
                </LabeledFlexWrapper>
            </div>
        </div>
    )
}

export default PostModal
