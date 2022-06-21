/* This example requires Tailwind CSS v2.0+ */
import { StarIcon } from '@heroicons/react/solid'
import Comments from '../../queries/comments';
import { Fragment, useState, useEffect } from 'react'

const reviews = {
  average: 4,
  totalCount: 1624,
  counts: [
    { rating: 5, count: 1019 },
    { rating: 4, count: 162 },
    { rating: 3, count: 97 },
    { rating: 2, count: 199 },
    { rating: 1, count: 147 },
  ],
  featured: [
    {
      id: 1,
      rating: 5,
      content: `
        <p>This is the bag of my dreams. I took it on my last vacation and was able to fit an absurd amount of snacks for the many long and hungry flights.</p>
      `,
      author: 'Emily Selman',
      avatarSrc:
        'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80',
    },
    // More reviews...
  ],
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function CommentSection(props) {
  const [comments, setComments] = useState([]);
  const [promedio, setPromedio] = useState('');
  const [estrellas, setEstrellas] = useState({1: 0, 2: 0, 3: 0, 4: 0, 5: 0});

  useEffect(() => {
    props.teacher ? Comments(props.teacher.id).then(res => {
      setComments(res)
    }) : setComments([])
  }, [props.teacher]);

  useEffect(() => {
    let suma = 0;
    let newEstrellas = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0};
    console.log(comments)
    for (let i = 0; i < comments.length; i++) {
      suma += comments[i].rating;
      newEstrellas[comments[i].rating] += 1;
    }
    setEstrellas(newEstrellas);
    setPromedio(parseInt(suma/comments.length));
  }, [comments]);

  console.log(estrellas);

  return (
    <>
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:py-32 lg:px-8 lg:grid lg:grid-cols-12 lg:gap-x-8">
        <div className="lg:col-span-4">
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">Reviews de sus Estudiantes</h2>

          <div className="mt-3 flex items-center">
            <div>
              <div className="flex items-center">
                {[0, 1, 2, 3, 4].map((rating) => (
                  <StarIcon
                    key={rating}
                    className={classNames(
                      promedio > rating ? 'text-yellow-400' : 'text-gray-300',
                      'flex-shrink-0 h-5 w-5'
                    )}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <p className="sr-only">{promedio} out of 5 stars</p>
            </div>
            <p className="ml-2 text-sm text-gray-900">Basado en {comments.length} reviews</p>
          </div>

          <div className="mt-6">
            <h3 className="sr-only">Review data</h3>

            <dl className="space-y-3">
              {reviews.counts.map((count) => (
                <div key={count.rating} className="flex items-center text-sm">
                  <dt className="flex-1 flex items-center">
                    <p className="w-3 font-medium text-gray-900">
                      {count.rating}
                      <span className="sr-only"> star reviews</span>
                    </p>
                    <div aria-hidden="true" className="ml-1 flex-1 flex items-center">
                      <StarIcon
                        className={classNames(
                          estrellas[count.rating] > 0 ? 'text-yellow-400' : 'text-gray-300',
                          'flex-shrink-0 h-5 w-5'
                        )}
                        aria-hidden="true"
                      />

                      <div className="ml-3 relative flex-1">
                        <div className="h-3 bg-gray-100 border border-gray-200 rounded-full" />
                        {estrellas[count.rating] > 0 ? (
                          <div
                            className="absolute inset-y-0 bg-yellow-400 border border-yellow-400 rounded-full"
                            style={{ width: `calc(${estrellas[count.rating]} / ${comments.length} * 100%)` }}
                          />
                        ) : null}
                      </div>
                    </div>
                  </dt>
                  <dd className="ml-3 w-10 text-right tabular-nums text-sm text-gray-900">
                    {Math.round((estrellas[count.rating] / comments.length) * 100)}%
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="mt-16 lg:mt-0 lg:col-start-6 lg:col-span-7">
          <h3 className="sr-only">Recent reviews</h3>

          <div className="flow-root">
            <div className="-my-12 divide-y divide-gray-200">
              {comments.map((review) => (
                <div key={review.id} className="py-12">
                  <div className="flex items-center">
                    <img src={review.picture} alt={`${review.author}.`} className="h-12 w-12 rounded-full" />
                    <div className="ml-4">
                      <h4 className="text-sm font-bold text-gray-900">{review.author}</h4>
                      <div className="mt-1 flex items-center">
                        {[0, 1, 2, 3, 4].map((rating) => (
                          <StarIcon
                            key={rating}
                            className={classNames(
                              review.rating > rating ? 'text-yellow-400' : 'text-gray-300',
                              'h-5 w-5 flex-shrink-0'
                            )}
                            aria-hidden="true"
                          />
                        ))}
                      </div>
                      <p className="sr-only">{review.rating} out of 5 stars</p>
                    </div>
                  </div>

                  <div
                    className="mt-4 space-y-6 text-base italic text-gray-600"
                    dangerouslySetInnerHTML={{ __html: review.body }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}