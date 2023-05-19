package com.eumpyo.eum.config.oauth2.handler;

import com.eumpyo.eum.common.util.TokenUtil;
import com.eumpyo.eum.config.oauth2.PrincipalDetails;
import com.eumpyo.eum.db.entity.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@Component
public class Oauth2AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    @Autowired
    TokenUtil tokenUtil;

    @Value("${my.domain}")
    private String domain;

    @Value("${my.port}")
    private String port;

    @Value("${accessToken.TOKEN_VALIDATION_SECOND}")
    private int TOKEN_VALIDATION_SECOND;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {
        PrincipalDetails oAuth2User = (PrincipalDetails) authentication.getPrincipal();
        User user = oAuth2User.getUser();
        String token = tokenUtil.generateJwtToken(user, "access");
        Cookie cookie = new Cookie("accessToken",token);
        cookie.setDomain(domain);
        cookie.setPath("/");

        // 300 분간 저장 tokenUtil과 동기화 해주세요.
        cookie.setMaxAge(TOKEN_VALIDATION_SECOND);
        cookie.setSecure(false);
        response.addCookie(cookie);

        String targetUrl = UriComponentsBuilder
                .fromUriString("http://"+ domain +":"+ port +"/oauth")
                .build()
                .toUriString();
        getRedirectStrategy().sendRedirect(request, response, targetUrl);
    }
}
