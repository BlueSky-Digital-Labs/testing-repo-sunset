import { useAuth } from '@hooks/useAuth'
import { useSettingsContent } from '@hooks/useContent'
import { DashboardLayout } from '@components/templates/DashboardLayout'
import { PageHeader } from '@components/molecules/PageHeader'
import { DarkModeToggle } from '@components/atoms/DarkModeToggle'
import { Palette, User } from 'lucide-react'
import './SettingsPage.css'

const SettingsPage = () => {
  const { user } = useAuth()
  const settingsContent = useSettingsContent()

  return (
    <DashboardLayout>
      <div className="settings-page page-enter">
        <PageHeader
          title={settingsContent.title}
          subtitle={settingsContent.subtitle}
        />

        <div className="settings-sections">
          <section className="settings-section" aria-labelledby="appearance-heading">
            <div className="settings-section__header">
              <div className="settings-section__icon" aria-hidden="true">
                <Palette size={20} />
              </div>
              <div>
                <h2 id="appearance-heading">{settingsContent.appearance.title}</h2>
                <p>{settingsContent.appearance.description}</p>
              </div>
            </div>
            <div className="settings-section__body">
              <DarkModeToggle />
            </div>
          </section>

          <section className="settings-section" aria-labelledby="account-heading">
            <div className="settings-section__header">
              <div className="settings-section__icon" aria-hidden="true">
                <User size={20} />
              </div>
              <div>
                <h2 id="account-heading">{settingsContent.account.title}</h2>
                <p>{settingsContent.account.description}</p>
              </div>
            </div>
            <dl className="settings-section__details">
              <div className="settings-detail">
                <dt>{settingsContent.account.emailLabel}</dt>
                <dd>{user?.email ?? settingsContent.account.noEmail}</dd>
              </div>
            </dl>
          </section>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default SettingsPage
