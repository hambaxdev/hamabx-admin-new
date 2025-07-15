import { useState } from 'react'
import AdaptiveCard from '@/components/shared/AdaptiveCard'
import { Steps } from '@/components/ui'
import Alert from '@/components/ui/Alert'
import Step1PersonalInfo from './components/Step1PersonalInfo'
import Step2Address from './components/Step2Address'
import Step3Contact from './components/Step3Contact'

const steps = ['Persönliche Daten', 'Adresse', 'Kontakt']

const CompleteRegistration = () => {
    const [currentStep, setCurrentStep] = useState(0)
    const [formData, setFormData] = useState({})
    const [errors, setErrors] = useState([])

    const next = () => {
        setErrors([])
        setCurrentStep((prev) => prev + 1)
    }

    const back = () => {
        setErrors([])
        setCurrentStep((prev) => prev - 1)
    }

    const handleSubmitStep = (data) => {
        setFormData((prev) => ({ ...prev, ...data }))
        next()
    }

    const handleComplete = (finalData) => {
        const mergedData = { ...formData, ...finalData }
        console.log('Final submitted data:', mergedData)
        // здесь можно вызвать API
    }

    const renderStep = () => {
        switch (currentStep) {
            case 0:
                return (
                    <Step1PersonalInfo
                        onNext={handleSubmitStep}
                        defaultValues={formData}
                    />
                )
            case 1:
                return (
                    <Step2Address
                        onNext={handleSubmitStep}
                        onBack={back}
                        defaultValues={formData}
                    />
                )
            case 2:
                return (
                    <Step3Contact
                        onBack={back}
                        onSubmit={handleComplete}
                        defaultValues={formData}
                        setErrors={setErrors} // ← добавили
                    />
                )
            default:
                return null
        }
    }

    return (
        <AdaptiveCard className="h-full">
            <div className="p-6">
                <div className="mb-6 text-center">
                    <h3 className="text-2xl font-bold">Complete Registration</h3>
                    <p className="text-base opacity-80">
                        Please complete the following steps
                    </p>
                </div>

                <div className="hidden sm:block mb-10 max-w-3xl mx-auto">
                    <Steps current={currentStep}>
                        {steps.map((step, index) => (
                            <Steps.Item key={index} title={step} />
                        ))}
                    </Steps>
                </div>

                <div className="max-w-3xl mx-auto">{renderStep()}</div>

                {errors.length > 0 && (
                    <Alert showIcon type="danger" className="mt-4 max-w-3xl mx-auto">
                        {errors.map((err, idx) => (
                            <div key={idx}>{err}</div>
                        ))}
                    </Alert>
                )}
            </div>
        </AdaptiveCard>
    )
}

export default CompleteRegistration
