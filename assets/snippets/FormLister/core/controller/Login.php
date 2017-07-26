<?php namespace FormLister;
/**
 * Контроллер для авторизации пользователя
 * Class Login
 * @package FormLister
 */
class Login extends Core
{
    public $user = null;
    protected $requestUri = '';
    protected $context = '';

    /**
     * Login constructor.
     * @param \DocumentParser $modx
     * @param array $cfg
     */
    public function __construct(\DocumentParser $modx, $cfg = array())
    {
        parent::__construct($modx, $cfg);
        $this->user = $this->loadModel(
            $this->getCFGDef('model', '\modUsers'),
            $this->getCFGDef('modelPath', 'assets/lib/MODxAPI/modUsers.php')
        );
        $this->requestUri = $this->modx->config['site_url'].ltrim($_SERVER['REQUEST_URI'],'/');
        $this->context = $this->getCFGDef('context','web');
        $lang = $this->lexicon->loadLang('login');
        if ($lang) {
            $this->log('Lexicon loaded', array('lexicon' => $lang));
        }
    }

    /**
     * @return string
     */
    public function render()
    {
        if ($this->modx->getLoginUserID($this->context)) {
            $this->redirect();
            $this->renderTpl = $this->getCFGDef('skipTpl', $this->lexicon->getMsg('login.default_skipTpl'));
            $this->setValid(false);
        };

        return parent::render();
    }


    /**
     *
     */
    public function process()
    {
        if (is_null($this->user)) {
            $this->addMessage($this->lexicon->getMsg('login.user_failed'));

            return;
        }
        $login = $this->getField($this->getCFGDef('loginField', 'username'));
        $password = $this->getField($this->getCFGDef('passwordField', 'password'));
        $remember = $this->getField($this->getCFGDef('rememberField', 'rememberme'));
        if ($this->user->checkBlock($login)) {
            $this->addMessage($this->lexicon->getMsg('login.user_blocked'));

            return;
        }
        $this->user->edit($login);

        if ($this->getCFGDef('checkActivation',0) && $this->user->get('logincount') < 0) {
            $this->addMessage($this->lexicon->getMsg('login.user_notactivated'));

            return;
        }

        $auth = $this->user->testAuth($login, $password, false, true);
        if (!$auth) {
            $this->addMessage($this->lexicon->getMsg('login.user_failed'));

            return;
        }
        if ($remember) {
            $remember = $this->getCFGDef('cookieLifetime', 60 * 60 * 24 * 365 * 5);
        }
        $loginCookie = $this->getCFGDef('cookieName','WebLoginPE');
        $this->user->authUser($login, $remember, $loginCookie, true);
        $this->setFormStatus(true);
        if (isset($this->modx->documentIdentifier) && $this->modx->documentIdentifier == $this->modx->config['unauthorized_page']) {
            $uaPage = $this->modx->makeUrl($this->modx->config['unauthorized_page'],"","","full");
            if (array_shift(explode('?',$this->requestUri)) != $uaPage) {
                $this->setField('redirectTo', $this->requestUri);
                $this->sendRedirect($this->requestUri);
            } else {
                $this->redirect();
            }
        } else {
            $this->redirect();
        }
        $this->setFields($this->user->toArray());
        $this->renderTpl = $this->getCFGDef('successTpl');
    }
}
