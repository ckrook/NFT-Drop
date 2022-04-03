import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { sanityClient, urlFor } from '../sanity'
import { Collection } from '../typings'
import '@fontsource/noto-sans/300.css'
import '@fontsource/playfair-display/400.css'
import { AiOutlinePlus } from 'react-icons/ai'

interface Props {
  collections: Collection[]
}

const Home = ({ collections }: Props) => {
  return (
    <div className="mx-auto flex min-h-screen flex-col  2xl:px-0">
      <Head>
        <title>NFT Drop</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <div className="mx-auto my-10 flex w-11/12 items-center justify-between">
          <div>social</div>
          <h1 className="text-4xl font-bold">Brand</h1>
          <div>
            <button>Contact</button>
          </div>
        </div>
      </header>

      <main className="">
        <section className="bg-orange-200 py-40 text-center">
          <h2 className="text-4xl">
            Välkommen till Sveriges äldsta NFT marknadsplats
          </h2>
        </section>

        <section>
          <div className="my-20 flex flex-col px-10 md:flex-row md:space-x-8">
            <div className="flex-1">
              <h2 className="mb-8 text-5xl">
                Samlarföremål för den digitala åldern
              </h2>
            </div>
            <div className="flex-1">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore
                excepturi iure incidunt quidem fugit ipsa eligendi aspernatur
                facilis, earum dolorem, repellat, officiis ab suscipit adipisci?
                Consequatur perspiciatis provident quas voluptatum.
              </p>
            </div>
          </div>
        </section>
        <section>
          <div className="my-20 flex flex-col space-y-8 space-x-0 px-10 md:flex-row md:space-x-8 md:space-y-0">
            <div className="flex-1 rounded-3xl bg-teal-400 p-10">
              <h2 className="mb-4 text-4xl text-emerald-100">
                Vårt miljöavtryck spelar roll
              </h2>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Accusamus officia dignissimos, explicabo, a cumque temporibus
              </p>
            </div>
            <div className="flex-1 rounded-3xl bg-amber-600 p-10">
              <h2 className="mb-4 text-4xl text-orange-100">
                En ny era av konstnärer
              </h2>
              <p className="text-orange-200">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Accusamus officia dignissimos, explicabo, a cumque temporibus
              </p>
            </div>
          </div>
        </section>
        <section className="bg-slate-100 p-10 shadow-xl shadow-slate-200/20">
          <h2 className="mb-8 text-4xl">Hitta din favorit kollektion</h2>
          <div className="grid space-x-3 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {collections.map((collection) => (
              <Link href={`/nft/${collection.slug.current}`}>
                <div className="flex cursor-pointer flex-col items-center rounded-3xl bg-gray-50 p-10 transition-all duration-200 hover:scale-105">
                  <img
                    className="mb-5 h-96 w-60 rounded-2xl object-cover"
                    src={urlFor(collection.mainImage).url()}
                    alt=""
                  />
                  <div className=" text-center">
                    <h3 className="mb-4 text-3xl">{collection.title}</h3>
                    <p className="text-gray-400">{collection.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
        <section>
          <div className="flex flex-col bg-stone-100 py-20 px-10 md:flex-row">
            <div className="flex-1">
              <h2 className="mb-4 text-5xl">Dina frågor besvarade</h2>
            </div>
            <div className="flex-1">
              <ul>
                <li className="flex justify-between border-b py-5">
                  <p>Vad är en NFT?</p>
                  <AiOutlinePlus />
                </li>
                <li className="flex justify-between border-b py-5">
                  <p>Vem står bakom [Brandname]?</p>
                  <AiOutlinePlus />
                </li>
                <li className="flex justify-between border-b py-5">
                  <p>Vad är Ethereum?</p>
                  <AiOutlinePlus />
                </li>
                <li className="flex justify-between border-b py-5">
                  <p>Hur mintar jag en NFT?</p>
                  <AiOutlinePlus />
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async () => {
  const query = `*[_type == "collection"]{
    _id,
    title,
    address,
    description,
    nftCollectionName,
    mainImage{
    asset
  },
  previewImage{
    asset
  },
  slug{
    current
  },
  creator->{
    _id,
    name,
    address,
    slug{
    current
  },
  },
  }`

  const collections = await sanityClient.fetch(query)

  return {
    props: {
      collections,
    },
  }
}
