import { Fragment, useState } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import {
    Bars3CenterLeftIcon,
    BellIcon,
    ClockIcon,
    CogIcon,
    CreditCardIcon,
    DocumentChartBarIcon,
    HomeIcon,
    QuestionMarkCircleIcon,
    ScaleIcon,
    ShieldCheckIcon,
    UserGroupIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline'
import {
    BanknotesIcon,
    BuildingOfficeIcon,
    CheckCircleIcon,
    ChevronDownIcon,
    ChevronRightIcon,
    MagnifyingGlassIcon,
} from '@heroicons/react/20/solid'

const cards = [
    { name: 'INSTRUCTOR RESOURCES', href: '#', icon: DocumentChartBarIcon},
    { name: 'PLACEHOLDER', href: '#', icon: DocumentChartBarIcon},
    { name: 'PLACEHOLDER', href: '#', icon: DocumentChartBarIcon},
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Example() {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <>
            <main>
                <div className="mt-8">
                    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                        <div className="mt-2 grid grid-cols-1 gap-14">
                            {/* Card */}
                            {cards.map((card) => (
                                <button key={card.name} className="overflow-hidden rounded-lg bg-white shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-900">
                                    <div className="p-5">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0">
                                                <card.icon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                                            </div>
                                            <div className="ml-0 w-0 flex-1">
                                                <dl>
                                                    <dd>
                                                        <div className="text-lg font-medium text-gray-900">{card.name}</div>
                                                    </dd>
                                                </dl>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 px-5 py-3">
                                        <div className="text-sm">
                                            <a href={card.href} className="font-medium text-blue-700 hover:text-blue-900">
                                                View
                                            </a>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </main>

        </>
    )
}
