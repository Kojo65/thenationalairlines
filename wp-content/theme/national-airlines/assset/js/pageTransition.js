'use strict'

const itemClass = {
	current: 'pt-page-current',
	prevReverse: 'pt-page-fadeIn',
	prev: 'pt-page-fade',
	next: 'pt-page-moveFromBottom',
	nextReverse: 'pt-page-moveToBottom',
	paused: 'pt-page-stop',
}

const isInView = (elem) => {
	const rect = elem.getBoundingClientRect()
	return rect.bottom > 0 && rect.top < (window.innerHeight || document.documentElement.clientHeight)
}

const isCurrent = (elem) => {
	return elem ? elem.classList.contains(itemClass.current) : false
}

const setCurrent = (elem) => {
	if (!elem) return
	elem.classList.add(itemClass.current)
}

const fetchGroup = (group = { container, pages: [] }) => {
	const { container, pages } = group
	if (!container || !pages || pages.length < 1) return false

	const current = pages.find((page) => isCurrent(page))

	pages.forEach((page, index) => {
		page.dataset.index = index
	})
	if (!current) {
		setCurrent(pages[0])
	}

	return true
}

const selectComponents = (containerSelector = '.pt-perspective', itemSelector = '.pt-page') => {
	return [...document.querySelectorAll(containerSelector)]
		.map((container) => {
			return {
				container: container,
				pages: [...container.querySelectorAll(itemSelector)],
			}
		})
		.filter((group) => fetchGroup(group))
}

const getPagesWithStatus = (pages = [], nextIndex = 1) => {
	const pageStatus = {
		current: null,
		next: null,
		prev: null,
	}
	if (!pages) return pageStatus
	const currentIndex = pages.findIndex((elem) => isCurrent(elem))

	if (currentIndex === -1) {
		setCurrent(pages[0])
		pageStatus.current = pages[0]
	} else {
		pageStatus.current = pages[currentIndex]
	}

	pageStatus.next = nextIndex < pages.length ? pages[nextIndex] : null
	pageStatus.prev = nextIndex < currentIndex ? pageStatus.next : null
	return pageStatus
}

const incSwitching = (ref, current, next) => {
	try {
		ref.lock = true

		current.classList.add(itemClass.prev)

		next.classList.add(itemClass.current)
		next.classList.add(itemClass.next)

		next.addEventListener(
			'animationend',
			() => {
				current.classList.remove(itemClass.current)
				current.classList.remove(itemClass.prev)

				next.classList.remove(itemClass.next)
				ref.lock = false
			},
			{ passive: true, once: true },
		)
	} catch (e) {
		console.warn(e)
	}
}

const decSwitching = (ref, current, prev) => {
	try {
		ref.lock = true

		prev.classList.add(itemClass.paused)
		prev.classList.add(itemClass.current)
		prev.classList.add(itemClass.prevReverse)

		current.classList.add(itemClass.paused)
		current.classList.add(itemClass.nextReverse)

		prev.classList.remove(itemClass.paused)
		current.classList.remove(itemClass.paused)

		current.addEventListener(
			'animationend',
			() => {
				prev.classList.remove(itemClass.prevReverse)

				current.classList.remove(itemClass.nextReverse)
				current.classList.remove(itemClass.current)
				ref.lock = false
			},
			{ passive: true, once: true },
		)
	} catch (e) {
		console.warn(e)
	}
}

const toggleChild = (ref = { lock: false, pages: [] }, index = 0) => {
	const { pages } = ref
	const { current, next, prev } = getPagesWithStatus(pages, index)
	if (!current || !next) return

	if (!ref.lock) {
		if (!prev) {
			incSwitching(ref, current, next)
		} else {
			decSwitching(ref, current, prev)
		}
	}
}

const toggleNext = (ref, direction = 1) => {
	const currentIndex = ref && ref.pages ? ref.pages.findIndex((elem) => isCurrent(elem)) : -1
	const nextIndex = direction < 1 && currentIndex !== -1 ? currentIndex - 1 : currentIndex + 1

	toggleChild(ref, nextIndex)
}

const scrollTrigger = (group, scrollY) => {
	const direction = scrollY > 0 ? 1 : -1

	if (!group.lock) {
		toggleNext(group, direction)
	}
}

const getHeaderHeight = () => {
	const header = document.querySelector('header') ? document.querySelector('header') : document.querySelector('.header')
	if (!header) return 64

	return header.offsetHeight
}

const setHeaderHeight = () => {
	const headerHeight = getHeaderHeight()
	document.documentElement.style.setProperty('--header', `${headerHeight}px`)
}

const setVh = () => {
	if (!window || !document || !document.documentElement || !window.innerHeight) return
	const vh = window.innerHeight * 0.01
	document.documentElement.style.setProperty('--vh', `${vh}px`)
}

document.addEventListener(
	'readystatechange',
	() => {
		setVh()
		setHeaderHeight()
		if (document.readyState === 'complete') {
			const list = selectComponents()
			document.addEventListener(
				'scroll',
				(e) => {
					const scrollY = window.scrollY

					const visible = list.filter((group) => isInView(group.container))

					if (visible.length > 0) {
						visible.forEach((group) => scrollTrigger(group, scrollY))
					}
				},
				{ passive: true },
			)
		}
	},
	{ passive: true },
)