#### How to install admin project
<ol>
    <li><code>install nodejs(https://nodejs.org/en)</code></li>
    <li><code>cd admin</code></li>
    <li><code>code .(if you run on terminal)</code></li>
    <li><code>npm install</code></li>
    <li><code>npm run dev</code></li>
</ol>

=====================================================

#### How to install api project
<ol>
    <li><code>composer update</code></li>
    <li><code>composer install</code></li>
    <li><code>cp .env.example .env</code></li>
    <li><code>php artisan key:generate</code></li>
    <li><code>php artisan migrate</code></li>
    <li><code>php artisan db:seed --force</code></li>
    <li><code>composer run dev</code></li>
</ol>