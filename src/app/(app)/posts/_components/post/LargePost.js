import TypeTag from '@/app/(app)/posts/_components/TypeTag'
import ImageCarousel from '@/app/(app)/posts/_components/ImageCarousel'
import DisplayContent from '@/app/(app)/posts/_components/DisplayContent'
import DisplayLocation from '@/app/(app)/posts/_components/map/DisplayLocation'
import Reward from '@/app/(app)/posts/_components/Reward'
import Button from '@/components/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { TagOutput } from '@/components/Tags'
import FlexCenterWrapper from '@/components/FlexCenterWrapper'
import LabeledFlexWrapper from '@/components/LabeledFlexWrapper'
import Link from 'next/link'

const LargePost = ({ post, user, onDeletePost }) => {
    return (
        <div>
            <div className="flex justify-between">
                {post?.type && <TypeTag type={post.type} />}
                <Link href={`/profile/${post.user.id}`}>
                    <div className="flex gap-1">
                        <FontAwesomeIcon
                            icon={faUserCircle}
                            className="text-xl text-white"
                        />
                        {post.user.name}
                    </div>
                </Link>
                {
                    post.user.id === user?.id && (
                    <Button
                        className="mt-1.5 mx-1 bg-red-500 hover:bg-red-600 focus:bg-red-900"
                        onClick={() => onDeletePost()}>
                        Delete post
                    </Button>
                    )
                }
            </div>
            <FlexCenterWrapper className="gap-5">
                <FlexCenterWrapper className="mb-10 w-2/3">
                    {post?.title && (
                        <h1 className="text-2xl font-bold mt-2">
                            {post.title}
                        </h1>
                    )}
                    {post?.reward !== 0 && <Reward value={post.reward} />}
                    <div className="h-0.5 rounded-full w-full bg-yellow-500 mt-1"></div>
                </FlexCenterWrapper>

                {JSON.parse(post?.images).length !== 0 && (
                    <ImageCarousel className="w-[500px]" images={JSON.parse(post.images)} />
                )}

                {post?.description && (
                    <DisplayContent content={post.description} />
                )}

                {post?.lat && post?.lng && (
                    <LabeledFlexWrapper label="Last known location">
                        <DisplayLocation
                            location={{ lat: post.lat, lng: post.lng }}
                        />
                    </LabeledFlexWrapper>
                )}

                {JSON.parse(post?.tags).length !== 0 && <TagOutput tags={JSON.parse(post.tags)} />}
            </FlexCenterWrapper>
        </div>
    )
}

export default LargePost
